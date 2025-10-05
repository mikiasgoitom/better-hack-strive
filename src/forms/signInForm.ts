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
      name: "age",
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
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
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Re-enter your password",
      isPassword: true,
      autoComplete: "current-password",
      validation: {
        required: "Confirm Password is required",
        minLength: 8,
        sameAs: "password",
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
  steps: [
    {
      id: "credentials",
      title: "Credentials",
      description: "Enter your account email and password",
      fields: ["email", "age"],
      nextLabel: "Continue",
      progressLabel: "Step 1 of 3",
    },
    {
      id: "password verification",
      title: "Password Verification",
      description: "Verify your password",
      fields: ["password", "confirmPassword"],
      nextLabel: "Continue",
      progressLabel: "Step 2 of 3",
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Adjust sign-in preferences",
      fields: ["rememberMe"],
      previousLabel: "Back",
      nextLabel: "Submit",
      progressLabel: "Step 3 of 3",
    },
  ],
};

export const signInFormConfig = parseFormConfig(signInFormJson);
