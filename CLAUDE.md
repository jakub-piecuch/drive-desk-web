# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Backend

The backend counterpart is a Java Spring service at `~/JavaProjects/book-and-drive-service`. Read it when you need to understand API contracts, endpoint signatures, request/response shapes, or authentication behaviour.

## Environment

Requires a `.env.local` file with:
- `NEXT_PUBLIC_RESOURCE_HOST` — base URL for the backend API

## Architecture

**Drive-Desk** is a driving school management app built with Next.js App Router (React 19, TypeScript).

### Stack

- **UI:** Material-UI (MUI) 7 with a custom dark theme (`src/theme/`)
- **Forms:** React Hook Form + Zod for validation
- **Server state:** TanStack React Query 5 (configured in root layout with `refetchOnWindowFocus: false`, `retry: false`)
- **Calendar:** React Big Calendar for lesson scheduling
- **Auth:** Clerk + NextAuth (login feature in progress on `feat/PLAT-0004_login_sign_in`)
- **Toasts:** Sonner

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
- `/auth/login` — login (WIP)
- `/home/*` — protected routes with sidebar layout (`src/app/home/layout.tsx`)
  - `/home/dashboard`, `/home/cars`, `/home/instructors`, `/home/trainees`, `/home/lessons`

### Path Aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`).

## In-Progress: Clerk Auth Integration (feat/PLAT-0004_login_sign_in)

Goal: replace the empty `src/app/auth/login/page.tsx` with a fully custom login **and** registration UI that matches the app's MUI dark theme (dark backgrounds `#222222`, green accent `#3c8843`, Inter font) — do **not** use Clerk's prebuilt `<SignIn />` / `<SignUp />` components.

### Steps remaining

1. **Wrap the app with `<ClerkProvider>`** in `src/app/layout.tsx` (outermost provider, above `EmotionRegistry`). Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env.local`.

2. **Add `src/middleware.ts`** using Clerk's `clerkMiddleware` + `createRouteMatcher` to protect `/home/*` routes and redirect unauthenticated users to `/auth/login`.

3. **Build the login page** (`src/app/auth/login/page.tsx`) using:
   - `useSignIn` from `@clerk/nextjs` for the Clerk flow
   - React Hook Form + Zod for validation (consistent with the rest of the app)
   - MUI components (`TextField`, `Button`, `Box`, etc.) styled to match the dark theme
   - Sonner toast on error
   - Redirect to `/home/dashboard` on success

4. **Add a registration page** at `src/app/auth/register/page.tsx` using:
   - `useSignUp` from `@clerk/nextjs`
   - Same form/validation/styling approach as login
   - Link between login ↔ register pages

5. **Remove NextAuth** (`next-auth` package + `src/types/next-auth.d.ts`) once Clerk is the sole auth provider.
