# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Coding Standards

Before writing or modifying any code in this repository, read the React developer agent:

```bash
cat $(readlink -f ~/.claude/commands/react-developer.md | xargs dirname)/../agents/react-developer.md
```

Follow every rule defined there.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Backend

The backend counterpart is a Java Spring service at `../book-and-drive-service`. Read it when you need to understand API contracts, endpoint signatures, request/response shapes, or authentication behaviour.

## Environment

Requires a `.env.local` file with:
- `NEXT_PUBLIC_RESOURCE_HOST` — base URL for the backend API
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk publishable key
- `CLERK_SECRET_KEY` — Clerk secret key (server-side only)

## Auth Flow

- `src/middleware.ts` — protects `/home/*` via `clerkMiddleware` + `createRouteMatcher`, redirects unauthenticated users to `/auth/login`
- `/auth/login` — custom MUI login page using `useSignIn` from `@clerk/nextjs`
- `OrgActivationGuard` (in `Layout.tsx`) — ensures a Clerk org is active before any API calls; gates rendering on `orgId` to prevent 403 flashes
- `useApiClient` (`src/hooks/useApiClient.ts`) — attaches Bearer JWT to every request; throws on 403

## Routing

- `/` — landing page
- `/auth/login` — login (Clerk, custom MUI UI)
- `/home/*` — protected, sidebar layout (`src/app/home/layout.tsx`)
  - `/home/dashboard`, `/home/cars`, `/home/instructors`, `/home/trainees`, `/home/lessons`
