# JSON-driven forms (monorepo)

This workspace hosts a playground Next.js app **and** a reusable package named `@better-forms-strive/core`. The package turns JSON descriptors into fully functional forms (UI + validation) that you can ship in any React project.

```
better-hack-strive/
├── packages/
│   └── better-form-core/   # Published package source
└── src/                    # Next.js playground consuming the package
```

## `@better-forms-strive/core` package

Key exports (all from `@better-forms-strive/core`):

- `FormBuilder` – renders JSON-driven forms with shadcn-inspired controls.
- `parseFormConfig` – validates and normalises a raw JSON string/object into a `FormConfig`.
- `buildBackendValidator` – produces a Zod schema mirroring the UI contract.
- Prebuilt UI primitives (button, input, select, textarea, checkbox, switch) and TypeScript types.

### Installation & build

Inside this repo:

```powershell
npm install
npm run build --workspace @better-forms-strive/core
```

In another project, install it as a local dependency or publish it to npm first. Once installed, usage looks like:

```tsx
import {
  FormBuilder,
  parseFormConfig,
  buildBackendValidator,
} from "@better-forms-strive/core";

const config = parseFormConfig(formJson);
const validator = buildBackendValidator(config);

export function OnboardingForm() {
  return <FormBuilder config={config} />;
}

export type OnboardingDto = typeof validator._type;
```

### JSON contract highlights

`sample-form.json` demonstrates what the schema supports:

- Static and remote selects (debounced search, pagination hints, caching metadata).
- Rich validation rules: required messages, regex, min/max, cross-field `sameAs`, conditional visibility.
- Layout and copy customisation (section titles, button labels, success/error messages).
- Optional multi-step flows via `steps`, including per-step labels and previous/next button text.

Because both the UI and backend validator derive from the same `FormConfig`, you get end-to-end type safety with minimal boilerplate.

### Extending the schema

To add a new field type:

1. Extend the discriminated union in `packages/better-form-core/src/types/form.types.ts`.
2. Mirror those changes in `packages/better-form-core/src/lib/formSchema.ts` so runtime validation matches the types.
3. Update the switch in `packages/better-form-core/src/components/FormBuilder.tsx` to render the new control.

## Playground app (Next.js)

The playground under `src/app` demonstrates the package in action. Notable files:

- `src/forms/signInForm.ts` – validated form config consumed by the UI.
- `src/app/page.tsx` and `src/app/signin/page.tsx` – render the `FormBuilder` with the demo config.

Start the dev server:

```powershell
npm run dev
```

When running `npm run dev`, editing any file under `src/app` hot-reloads the preview.

## Scripts & workflows

- `npm run dev` – Next.js dev server for the playground.
- `npm run lint` – ESLint (ignores generated `dist/` artifacts).
- `npm run build --workspace @better-forms-strive/core` – builds the reusable package with `tsup`.
- `npm run build` – production build of the Next.js app (uses Turbopack).

> ℹ️ Turbopack may emit a warning about multiple `package-lock.json` files if you have other workspaces checked out nearby. Either set `turbopack.root` in `next.config.ts` or remove extraneous lockfiles to silence it.

## Backend validation example

```ts
import { promises as fs } from "node:fs";
import {
  parseFormConfig,
  buildBackendValidator,
} from "@better-forms-strive/core";

async function bootstrap() {
  const raw = await fs.readFile("sample-form.json", "utf-8");

  const config = parseFormConfig(raw);
  const validator = buildBackendValidator(config);

  const dto = validator.parse({
    email: "admin@example.com",
    password: "supersecret!!",
    confirmPassword: "supersecret!!",
    organizationId: "org_123",
    permissions: ["manage_users"],
    receiveUpdates: true,
  });

  console.log(dto);
}
```

The validator is a standard Zod schema, making it easy to plug into API routes, server actions, tRPC routers, or any backend runtime that needs request validation.

## Contributing

1. Install dependencies: `npm install`
2. Run linting and builds before committing: `npm run lint && npm run build --workspace @better-forms-strive/core`
3. Prefer updating both types and runtime schemas together so the contract stays in sync.
