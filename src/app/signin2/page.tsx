'use client'

import { FormBuilder } from "@/components/FormBuilder";
import { signInFormConfig2 } from "@/forms/signInForm2";
import { useState } from "react";

export default function Home() {
  // 1. ADD STATE to the parent component
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // 2. DEFINE THE CUSTOM ACTION function
  const handleSignInAction = async (data: Record<string, unknown>) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    console.log("Custom sign-in action triggered with data:", data);

    // --- YOUR CUSTOM LOGIC GOES HERE ---
    // For example, calling an auth library, a different fetch, etc.
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Example of a failed login
      if ((data.email as string).includes("fail")) {
          throw new Error("Unable to complete action.");
      }
      
      console.log("Custom action successful!");
      // Handle success (e.g., redirect, show success message)
      // router.push('/dashboard');

    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <FormBuilder 
          config={signInFormConfig2} 
          onSubmitAction={handleSignInAction}
          isSubmitting={isSubmitting}
          submissionError={submissionError}
          />
      </div>
    </main>
  );
}
