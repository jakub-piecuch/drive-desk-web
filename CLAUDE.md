# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Coding Standards

Before writing or modifying any code in this repository, always run the `/react-developer` command and follow the coding standards and best practices it defines.

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

## Architecture

**Drive-Desk** is a driving school management app built with Next.js App Router (React 19, TypeScript).

### Stack

- **UI:** Material-UI (MUI) 7 with a custom dark theme (`src/theme/`)
- **Forms:** React Hook Form + Zod for validation
- **Server state:** TanStack React Query 5 (configured in root layout with `refetchOnWindowFocus: false`, `retry: false`)
- **Calendar:** React Big Calendar for lesson scheduling
- **Auth:** Clerk (`@clerk/nextjs`) — sole auth provider
- **Toasts:** Sonner

### Auth Flow

- `src/middleware.ts` — protects `/home/*` routes via `clerkMiddleware` + `createRouteMatcher`, redirects unauthenticated users to `/auth/login`
- `/auth/login` — custom MUI login page using `useSignIn` from `@clerk/nextjs`
- `OrgActivationGuard` (in `Layout.tsx`) — ensures a Clerk org is active before any API calls are made; `Layout.tsx` gates rendering on `orgId` being set to prevent 403 flashes
- `useApiClient` (`src/hooks/useApiClient.ts`) — attaches Bearer JWT to every request; throws on 403

### Feature Module Pattern

Each entity (cars, instructors, trainees, lessons) follows the same structure under `src/app/home/{entity}/`:

```
{entity}.api.ts     # Raw fetch() calls using RESOURCE_HOST() base URL
{entity}.hooks.ts   # React Query wrappers (useQuery / useMutation)
{entity}.types.ts   # TypeScript interfaces
modules/            # Feature-specific components (CreateModal, UpdateModal, Selector)
page.tsx            # Route page
```

API files use `RESOURCE_HOST()` from `src/config/env.config.ts` as the base URL. Mutations invalidate relevant queries via `queryClient.invalidateQueries()` and show Sonner toasts on success/error.

Shared types live in `src/types/`:
- `api.types.ts` — `PaginatedResponse<T>` (Spring Boot paginated envelope with `content[]` + `page` metadata)
- `error.ts` — `BaseException` class with static factory methods (`notFound`, `badRequest`, `unauthorized`, etc.) and `ErrorDetails` interface matching the backend error shape

### Shared Components

`src/components/elements/` — reusable primitives:
- `DataTable.tsx` — generic table with search, edit, delete actions
- `EntityFormModal.tsx` (`src/components/modals/`) — base modal for create/update forms
- `DataSelector.tsx`, `DateTimeSelector.tsx`, `FormInputRow.tsx`, `ConfirmDialog.tsx`

### Routing

- `/` — landing page
- `/auth/login` — login page (Clerk, custom MUI UI)
- `/home/*` — protected routes with sidebar layout (`src/app/home/layout.tsx`)
  - `/home/dashboard`, `/home/cars`, `/home/instructors`, `/home/trainees`, `/home/lessons`

### Path Aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`).
