# Deploying the frontend

Runs on the same VPS as the backend (`196.189.126.55`), as its own container on
host port 7005 (internally the container still listens on 3005). No domain yet, so
it's reached as `http://196.189.126.55:7005` — plain HTTP, no TLS, until a domain is
pointed at this server. Ports 3001/3005 were already taken by other apps on this
shared server (checked via `ss -tlnp`), so this stack uses 7001/7005 instead.

Push to `main` → GitHub Actions builds the project as a sanity check, then SSHes
into the VPS and runs `scripts/deploy.sh`, which pulls the latest code, rebuilds the
Docker image (baking in `NEXT_PUBLIC_API_URL`), and restarts the container.

`NEXT_PUBLIC_API_URL` is a **build-time** value — Next.js inlines it into the
client bundle, so changing it requires a rebuild, not just a restart. It currently
points at `http://196.189.126.55:7001/api` (the backend, same server, host port 7001).

Note: the backend must already be deployed and reachable (with real `Page` rows in
the database) before this build runs — `[...slug]/page.tsx` fetches page data at
build time via `generateStaticParams`, and the build fails if nothing answers.
Always deploy the backend first.

## One-time VPS setup

This assumes Docker is already installed and working (shared with the backend setup —
see the backend repo's `DEPLOY.md`), and you already have a `deploy` user with SSH
key access.

1. **Clone the repo** at the path you'll use as `VPS_APP_PATH`:
   ```bash
   su - deploy
   git clone https://github.com/richmelese/cop-landing-page.git /home/deploy/cop-frontend
   cd /home/deploy/cop-frontend
   chmod +x scripts/deploy.sh
   ```

2. **Create the production `.env`** at `/home/deploy/cop-frontend/.env` (never
   committed):
   ```
   NEXT_PUBLIC_API_URL=http://196.189.126.55:7001/api
   ```

3. **Open the port** (if not already open):
   ```bash
   ufw allow 7005
   ```

4. **First deploy, run manually once** (make sure the backend is already up first):
   ```bash
   bash scripts/deploy.sh
   ```

5. **Verify**: `curl http://localhost:7005` on the server, or
   `http://196.189.126.55:7005` from your own machine.

6. **Update the backend's CORS**: set `CORS_ORIGIN=http://196.189.126.55:7005` in
   the backend's `.env` (`/home/deploy/cop-backend/.env`) and redeploy the backend
   (`bash /home/deploy/cop-backend/scripts/deploy.sh`), since the frontend now calls
   it cross-origin (different port = different origin).

## GitHub repo secrets

Add these under the frontend repo's **Settings → Secrets and variables → Actions**
(same values as the backend repo, except the app path):

| Secret | Value |
|---|---|
| `VPS_HOST` | `196.189.126.55` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | Contents of the same deploy private key used for the backend |
| `VPS_APP_PATH` | `/home/deploy/cop-frontend` |

## If you get a domain later

Point it at `196.189.126.55`. This server already runs nginx for its other apps on
ports 80/443 — add a server block there for TLS and clean URLs, and update
`NEXT_PUBLIC_API_URL` / `CORS_ORIGIN` to match. Everything else about this pipeline
stays the same.
