// macro-signups: stores email sign-ups from the MACRO app in Cloudflare KV.
// No IP address, location or other request metadata is stored.

const MAX_BODY_BYTES = 2048;
const MAX_EMAIL_LENGTH = 254;
const KEY_PREFIX = 'email:';

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...(extraHeaders || {}) },
  });
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

// Constant-time string comparison: hash both sides to equal length, then XOR every byte.
async function safeEqual(a, b) {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(String(a))),
    crypto.subtle.digest('SHA-256', enc.encode(String(b))),
  ]);
  const x = new Uint8Array(ha);
  const y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

async function handleSubscribe(request, env) {
  const origin = request.headers.get('Origin') || '';
  if (!allowedOrigins(env).includes(origin)) {
    return json({ ok: false, error: 'origin_not_allowed' }, 403);
  }
  const cors = corsHeaders(origin);

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405, cors);

  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: 'too_large' }, 413, cors);
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'too_large' }, 413, cors);
  }

  let body;
  try {
    body = JSON.parse(text);
  } catch (e) {
    return json({ ok: false, error: 'bad_request' }, 400, cors);
  }
  const email = body && typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || !email.includes('@') || email.length > MAX_EMAIL_LENGTH) {
    return json({ ok: false, error: 'invalid_email' }, 400, cors);
  }

  await env.SIGNUPS.put(
    KEY_PREFIX + email,
    JSON.stringify({ email, timestamp: new Date().toISOString(), origin })
  );
  return json({ ok: true }, 200, cors);
}

async function handleExport(request, env) {
  const header = request.headers.get('Authorization') || '';
  const match = /^Bearer (.+)$/.exec(header);
  if (!env.EXPORT_KEY || !match || !(await safeEqual(match[1], env.EXPORT_KEY))) {
    return json({ error: 'not_found' }, 404);
  }
  const signups = [];
  let cursor;
  do {
    const page = await env.SIGNUPS.list({ prefix: KEY_PREFIX, cursor });
    for (const k of page.keys) {
      const raw = await env.SIGNUPS.get(k.name);
      if (raw) {
        try {
          signups.push(JSON.parse(raw));
        } catch (e) {
          signups.push({ email: k.name.slice(KEY_PREFIX.length) });
        }
      }
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return json({ count: signups.length, signups }, 200);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/subscribe') return handleSubscribe(request, env);
    if (pathname === '/export' && request.method === 'GET') return handleExport(request, env);
    if (pathname === '/health' && request.method === 'GET') return json({ ok: true }, 200);
    return json({ error: 'not_found' }, 404);
  },
};
