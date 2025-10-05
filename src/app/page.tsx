"use client";

import { FormBuilder } from "../components/FormBuilder";

import { signInFormConfig } from "../forms/signInForm";

export type { FormBuilderProps } from "../components/FormBuilder";
export { FormBuilder } from "../components/FormBuilder";

export { Button } from "../components/ui/button";
export { Checkbox } from "../components/ui/checkbox";
export { Form } from "../components/ui/form";
export { Input } from "../components/ui/input";
export { Select } from "../components/ui/select";
export { Switch } from "../components/ui/switch";
export { Textarea } from "../components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <FormBuilder config={signInFormConfig} />
      </div>
    </main>
  );
}
