# Next.js (v13.4), React (v18.2) TS app

### Setup

```bash
npm install

cp .env.local.example .env.local

## make sure .env.local is setup
OKTA_OAUTH2_ISSUER=...
OKTA_OAUTH2_CLIENT_ID=...
OKTA_OAUTH2_CLIENT_SECRET=...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...

NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN=
```

### Usage

Run the development server:

```bash
npm run dev
```

Based on https://github.com/nextauthjs/next-auth-example
