// src/components/JsonToForm.tsx

import React, { useState } from 'react';

// --- TYPE DEFINITIONS for our simple schema ---
type FieldOption = {
  label: string;
  value: string;
};

type Field = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea';
  placeholder?: string;
  options?: FieldOption[];
  validation?: {
    required?: boolean;
  };
};

export type SimpleFormSchema = {
  fields: Field[];
};

type JsonToFormProps = {
  schema: SimpleFormSchema;
  onSubmit: (data: Record<string, any>) => void;
};

// --- HELPER FUNCTION to create initial state from schema ---
const getInitialState = (schema: SimpleFormSchema) => {
  const initialState: Record<string, any> = {};
  for (const field of schema.fields) {
    initialState[field.name] = field.type === 'checkbox' ? false : '';
  }
  return initialState;
};

// --- THE MAIN COMPONENT ---
export default function JsonToForm({ schema, onSubmit }: JsonToFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => getInitialState(schema));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const field of schema.fields) {
      if (field.validation?.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // For checkboxes, we need the `checked` property, not `value`
    const newValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: Field) => {
    const error = errors[field.name];
    const commonProps = {
      id: field.name,
      name: field.name,
      onChange: handleChange,
      className: `w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`,
    };

    switch (field.type) {
      case 'select':
        return (
          <select {...commonProps} value={formData[field.name]}>
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center gap-2">
            <input
              {...commonProps}
              type="checkbox"
              checked={formData[field.name]}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={field.name} className="text-sm text-gray-700">{field.label}</label>
          </div>
        );
    case 'textarea':
      return (
        <textarea
          {...commonProps}
          value={formData[field.name]}
          placeholder={field.placeholder}
          rows={4} // Give it a nice default height
        />
      );
      default: // text, email, number
        return (
          <input
            {...commonProps}
            type={field.type}
            value={formData[field.name]}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.fields.map((field) => (
        <div key={field.name}>
          {field.type !== 'checkbox' && (
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-800 mb-1">
              {field.label}
            </label>
          )}
          {renderField(field)}
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
