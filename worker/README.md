# macro-signups (Cloudflare Worker)

Stores email sign-ups from the MACRO app in a KV namespace. It stores only the email,
a server timestamp and the page origin it came from. It does not store IP address or location.
It does not send any email.

## Endpoints

- `POST /subscribe` with JSON `{"email": "..."}`. Only the origins in `ALLOWED_ORIGINS` are accepted.
  Entries are keyed `email:<lowercased email>`, so a repeat sign-up overwrites the earlier one.
- `GET /export` returns all sign-ups as JSON. Needs `Authorization: Bearer <EXPORT_KEY>`, otherwise 404.
- `GET /health` returns `{"ok":true}`.

## Deploy

1. Create the KV namespace: `npx wrangler kv namespace create SIGNUPS`
2. Put the id it prints in `wrangler.toml` in place of `REPLACE_WITH_KV_ID`.
3. Set the export key: `npx wrangler secret put EXPORT_KEY` (use a long random value).
4. `npx wrangler deploy`

If the Worker ends up on a different URL than `https://macro-signups.prodbykctw.workers.dev`,
change the `SIGNUP_URL` constant at the top of the script in `index.html`.

## Export the list

    curl -H "Authorization: Bearer $EXPORT_KEY" https://macro-signups.prodbykctw.workers.dev/export

## Tests

    npm test        # node:test, no dependencies
