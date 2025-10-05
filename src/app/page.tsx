import { FormBuilder } from "@better-forms-strive/core";

import { signInFormConfig } from "../forms/signInForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <FormBuilder config={signInFormConfig} />
      </div>
    </main>
  );
}
