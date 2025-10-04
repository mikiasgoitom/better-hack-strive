// app/simple-form/page.tsx

"use client"; // This tells Next.js this is a Client Component because it uses hooks (useState)

import JsonToForm, { SimpleFormSchema } from '@/components/JsonToForm';

// --- DEFINE YOUR FORM'S STRUCTURE AS A JSON-LIKE OBJECT ---
const registrationSchema: SimpleFormSchema = {
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Jane',
      validation: { required: true },
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@example.com',
      validation: { required: true },
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      placeholder: 'Please choose one...',
      options: [
        { label: 'Engineering', value: 'eng' },
        { label: 'Marketing', value: 'mkt' },
        { label: 'Sales', value: 'sales' },
      ],
      validation: { required: true },
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: '15',
    },
    {
      "name": "additionalComments",
      "label": "Additional Comments",
      "type": "textarea",
      "placeholder": "Let us know anything else...",
      "validation": { "required": false }
    },
    {
      name: 'terms',
      label: 'I agree to the terms and conditions',
      type: 'checkbox',
      validation: { required: true },
    },
  ],
};

export default function SimpleFormPage() {
  const handleFormSubmit = (data: Record<string, any>) => {
    // In a real app, you would send this data to an API
    console.log('Form data submitted:', data);
    alert('Form submitted successfully!\n\n' + JSON.stringify(data, null, 2));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Simple JSON Form</h1>
        <div className="p-8 border rounded-lg shadow-lg bg-white">
          <JsonToForm schema={registrationSchema} onSubmit={handleFormSubmit} />
        </div>
      </div>
    </main>
  );
}