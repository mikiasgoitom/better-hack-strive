import { parseFormConfig } from "@/lib/formParser";
import type { FormConfigInput } from "@/lib/formSchema";

const signInFormJson: FormConfigInput = {
  title: "Welcome back",
  description: "Use your company credentials to access the dashboard.",
  endpoint: "/api/sign-in",
  method: "POST",
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "you@example.com",
      autoComplete: "email",
      validation: {
        required: "Email is required",
        email: true,
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      isPassword: true,
      autoComplete: "current-password",
      validation: {
        required: "Password is required",
        minLength: 8,
      },
    },
    {
      name: "rememberMe",
      type: "toggle",
      label: "Remember me",
      defaultValue: true,
      description: "Keep me signed in on this device",
    },
  ],
  submit: {
    label: "Sign in",
    loadingText: "Signing in...",
    successMessage: "Signed in successfully",
    errorMessage: "Unable to sign in with the provided credentials",
  },
};

export const signInFormConfig = parseFormConfig(signInFormJson);
