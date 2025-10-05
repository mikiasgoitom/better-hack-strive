import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type FormFieldType = "text" | "email" | "password" | "textarea" | "number" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
type BackendDataType = "string" | "number" | "boolean" | "date" | "datetime" | "enum" | "object" | "array" | "json";
interface StaticOption {
    value: string | number | boolean;
    label: string;
    description?: string;
    disabled?: boolean;
}
interface DynamicDataSource {
    type: "remote";
    endpoint: string;
    method?: "GET" | "POST";
    queryParam?: string;
    payloadTemplate?: Record<string, unknown>;
    headers?: Record<string, string>;
    authTokenRef?: string;
    debounceMs?: number;
    pagination?: {
        mode: "infinite" | "paged";
        pageSize?: number;
        pageParam?: string;
        cursorParam?: string;
        labelKey: string;
        valueKey: string;
        hasMoreKey?: string;
    };
    cacheTtlMs?: number;
}
interface FieldValidationRules {
    required?: boolean | string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    email?: boolean;
    url?: boolean;
    sameAs?: string;
    customValidatorKey?: string;
}
interface VisibilityRule {
    field: string;
    operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
    value?: unknown;
}
interface FieldLayout {
    colSpan?: number;
    rowSpan?: number;
    order?: number;
    width?: "full" | "half" | "third";
}
interface FormField {
    name: string;
    type: FormFieldType;
    label?: string;
    placeholder?: string;
    description?: string;
    helpText?: string;
    icon?: string;
    defaultValue?: unknown;
    disabled?: boolean;
    readOnly?: boolean;
    isPassword?: boolean;
    inputMode?: "text" | "email" | "numeric" | "tel" | "url";
    autoComplete?: string;
    mask?: string;
    rows?: number;
    step?: number;
    min?: number | string;
    max?: number | string;
    maxSelections?: number;
    dataType?: BackendDataType;
    options?: StaticOption[];
    dataSource?: DynamicDataSource;
    validation?: FieldValidationRules;
    visibleWhen?: VisibilityRule[];
    layout?: FieldLayout;
    attributes?: Record<string, string | number | boolean>;
}
interface SubmitAction {
    label: string;
    icon?: string;
    variant?: "primary" | "secondary" | "danger";
    loadingText?: string;
    successMessage?: string;
    errorMessage?: string;
    confirmDialog?: {
        title: string;
        message: string;
        confirmLabel?: string;
        cancelLabel?: string;
    };
}
interface FormStep {
    id: string;
    title?: string;
    description?: string;
    fields: string[];
    nextLabel?: string;
    previousLabel?: string;
    progressLabel?: string;
}
interface FormConfig {
    title?: string;
    description?: string;
    endpoint: string;
    method?: "POST" | "PUT" | "PATCH";
    headers?: Record<string, string>;
    authTokenRef?: string;
    fields: FormField[];
    steps?: FormStep[];
    submit: SubmitAction;
    onSuccessRedirect?: string;
    onSuccessMessage?: string;
    onErrorMessage?: string;
    draft?: {
        autosave?: boolean;
        intervalMs?: number;
    };
}

interface FormBuilderProps {
    config: FormConfig;
    onSubmitSuccess?: (data: Record<string, unknown>) => void;
    onSubmitError?: (error: unknown) => void;
    fetcher?: typeof fetch;
    onRedirect?: (url: string) => void;
}
declare const FormBuilder: ({ config, onSubmitError, onSubmitSuccess, fetcher, onRedirect, }: FormBuilderProps) => react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "secondary" | "default" | "destructive" | "outline" | "ghost" | "link" | null | undefined;
    size?: "icon" | "default" | "sm" | "lg" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>): react_jsx_runtime.JSX.Element;

interface FormProps<TFieldValues extends FieldValues = FieldValues> extends React.FormHTMLAttributes<HTMLFormElement> {
    form: UseFormReturn<TFieldValues>;
    children: React.ReactNode;
}
declare function Form<TFieldValues extends FieldValues>({ form, children, className, ...props }: FormProps<TFieldValues>): react_jsx_runtime.JSX.Element;
type FormItemProps = React.HTMLAttributes<HTMLDivElement>;
declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React.ForwardRefExoticComponent<React.LabelHTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>>;
declare const FormDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FormControl: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

declare class FormConfigError extends Error {
    issues: z.ZodIssue[];
    constructor(message: string, issues: z.ZodIssue[]);
}
/**
 * Parse an unknown input (object or JSON string) into a validated {@link FormConfig}.
 */
declare function parseFormConfig(input: unknown): FormConfig;
declare function buildBackendValidator(config: FormConfig): z.ZodObject<Record<string, z.ZodTypeAny>, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}> | z.ZodEffects<z.ZodObject<Record<string, z.ZodTypeAny>, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;

declare const formFieldSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"text">, z.ZodLiteral<"email">, z.ZodLiteral<"password">, z.ZodLiteral<"textarea">, z.ZodLiteral<"number">, z.ZodLiteral<"select">, z.ZodLiteral<"multiselect">, z.ZodLiteral<"checkbox">, z.ZodLiteral<"radio">, z.ZodLiteral<"date">, z.ZodLiteral<"datetime">, z.ZodLiteral<"file">, z.ZodLiteral<"toggle">]>;
    label: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    helpText: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    defaultValue: z.ZodOptional<z.ZodUnknown>;
    disabled: z.ZodOptional<z.ZodBoolean>;
    readOnly: z.ZodOptional<z.ZodBoolean>;
    isPassword: z.ZodOptional<z.ZodBoolean>;
    inputMode: z.ZodOptional<z.ZodEnum<["text", "email", "numeric", "tel", "url"]>>;
    autoComplete: z.ZodOptional<z.ZodString>;
    mask: z.ZodOptional<z.ZodString>;
    rows: z.ZodOptional<z.ZodNumber>;
    step: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    max: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    maxSelections: z.ZodOptional<z.ZodNumber>;
    dataType: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">, z.ZodLiteral<"date">, z.ZodLiteral<"datetime">, z.ZodLiteral<"enum">, z.ZodLiteral<"object">, z.ZodLiteral<"array">, z.ZodLiteral<"json">]>>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        value: string | number | boolean;
        label: string;
        description?: string | undefined;
        disabled?: boolean | undefined;
    }, {
        value: string | number | boolean;
        label: string;
        description?: string | undefined;
        disabled?: boolean | undefined;
    }>, "many">>;
    dataSource: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"remote">;
        endpoint: z.ZodString;
        method: z.ZodOptional<z.ZodEnum<["GET", "POST"]>>;
        queryParam: z.ZodOptional<z.ZodString>;
        payloadTemplate: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        authTokenRef: z.ZodOptional<z.ZodString>;
        debounceMs: z.ZodOptional<z.ZodNumber>;
        pagination: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<["infinite", "paged"]>;
            pageSize: z.ZodOptional<z.ZodNumber>;
            pageParam: z.ZodOptional<z.ZodString>;
            cursorParam: z.ZodOptional<z.ZodString>;
            labelKey: z.ZodString;
            valueKey: z.ZodString;
            hasMoreKey: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        }, {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        }>>;
        cacheTtlMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "remote";
        endpoint: string;
        method?: "GET" | "POST" | undefined;
        queryParam?: string | undefined;
        payloadTemplate?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        authTokenRef?: string | undefined;
        debounceMs?: number | undefined;
        pagination?: {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        } | undefined;
        cacheTtlMs?: number | undefined;
    }, {
        type: "remote";
        endpoint: string;
        method?: "GET" | "POST" | undefined;
        queryParam?: string | undefined;
        payloadTemplate?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        authTokenRef?: string | undefined;
        debounceMs?: number | undefined;
        pagination?: {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        } | undefined;
        cacheTtlMs?: number | undefined;
    }>>;
    validation: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodObject<{
        required: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        pattern: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodBoolean>;
        url: z.ZodOptional<z.ZodBoolean>;
        sameAs: z.ZodOptional<z.ZodString>;
        customValidatorKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    }, {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    }>, {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    }, {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    }>, {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    }, {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    }>>;
    visibleWhen: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodString;
        operator: z.ZodEnum<["equals", "notEquals", "in", "notIn", "exists", "greaterThan", "lessThan"]>;
        value: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        field: string;
        operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
        value?: unknown;
    }, {
        field: string;
        operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
        value?: unknown;
    }>, "many">>;
    layout: z.ZodOptional<z.ZodObject<{
        colSpan: z.ZodOptional<z.ZodNumber>;
        rowSpan: z.ZodOptional<z.ZodNumber>;
        order: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodEnum<["full", "half", "third"]>>;
    }, "strip", z.ZodTypeAny, {
        colSpan?: number | undefined;
        rowSpan?: number | undefined;
        order?: number | undefined;
        width?: "full" | "half" | "third" | undefined;
    }, {
        colSpan?: number | undefined;
        rowSpan?: number | undefined;
        order?: number | undefined;
        width?: "full" | "half" | "third" | undefined;
    }>>;
    attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
}, "strip", z.ZodTypeAny, {
    type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
    name: string;
    options?: {
        value: string | number | boolean;
        label: string;
        description?: string | undefined;
        disabled?: boolean | undefined;
    }[] | undefined;
    validation?: {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    } | undefined;
    label?: string | undefined;
    description?: string | undefined;
    disabled?: boolean | undefined;
    min?: string | number | undefined;
    max?: string | number | undefined;
    placeholder?: string | undefined;
    helpText?: string | undefined;
    icon?: string | undefined;
    defaultValue?: unknown;
    readOnly?: boolean | undefined;
    isPassword?: boolean | undefined;
    inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
    autoComplete?: string | undefined;
    mask?: string | undefined;
    rows?: number | undefined;
    step?: number | undefined;
    maxSelections?: number | undefined;
    dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
    dataSource?: {
        type: "remote";
        endpoint: string;
        method?: "GET" | "POST" | undefined;
        queryParam?: string | undefined;
        payloadTemplate?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        authTokenRef?: string | undefined;
        debounceMs?: number | undefined;
        pagination?: {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        } | undefined;
        cacheTtlMs?: number | undefined;
    } | undefined;
    visibleWhen?: {
        field: string;
        operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
        value?: unknown;
    }[] | undefined;
    layout?: {
        colSpan?: number | undefined;
        rowSpan?: number | undefined;
        order?: number | undefined;
        width?: "full" | "half" | "third" | undefined;
    } | undefined;
    attributes?: Record<string, string | number | boolean> | undefined;
}, {
    type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
    name: string;
    options?: {
        value: string | number | boolean;
        label: string;
        description?: string | undefined;
        disabled?: boolean | undefined;
    }[] | undefined;
    validation?: {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    } | undefined;
    label?: string | undefined;
    description?: string | undefined;
    disabled?: boolean | undefined;
    min?: string | number | undefined;
    max?: string | number | undefined;
    placeholder?: string | undefined;
    helpText?: string | undefined;
    icon?: string | undefined;
    defaultValue?: unknown;
    readOnly?: boolean | undefined;
    isPassword?: boolean | undefined;
    inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
    autoComplete?: string | undefined;
    mask?: string | undefined;
    rows?: number | undefined;
    step?: number | undefined;
    maxSelections?: number | undefined;
    dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
    dataSource?: {
        type: "remote";
        endpoint: string;
        method?: "GET" | "POST" | undefined;
        queryParam?: string | undefined;
        payloadTemplate?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        authTokenRef?: string | undefined;
        debounceMs?: number | undefined;
        pagination?: {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        } | undefined;
        cacheTtlMs?: number | undefined;
    } | undefined;
    visibleWhen?: {
        field: string;
        operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
        value?: unknown;
    }[] | undefined;
    layout?: {
        colSpan?: number | undefined;
        rowSpan?: number | undefined;
        order?: number | undefined;
        width?: "full" | "half" | "third" | undefined;
    } | undefined;
    attributes?: Record<string, string | number | boolean> | undefined;
}>, {
    type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
    name: string;
    options?: {
        value: string | number | boolean;
        label: string;
        description?: string | undefined;
        disabled?: boolean | undefined;
    }[] | undefined;
    validation?: {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    } | undefined;
    label?: string | undefined;
    description?: string | undefined;
    disabled?: boolean | undefined;
    min?: string | number | undefined;
    max?: string | number | undefined;
    placeholder?: string | undefined;
    helpText?: string | undefined;
    icon?: string | undefined;
    defaultValue?: unknown;
    readOnly?: boolean | undefined;
    isPassword?: boolean | undefined;
    inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
    autoComplete?: string | undefined;
    mask?: string | undefined;
    rows?: number | undefined;
    step?: number | undefined;
    maxSelections?: number | undefined;
    dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
    dataSource?: {
        type: "remote";
        endpoint: string;
        method?: "GET" | "POST" | undefined;
        queryParam?: string | undefined;
        payloadTemplate?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        authTokenRef?: string | undefined;
        debounceMs?: number | undefined;
        pagination?: {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        } | undefined;
        cacheTtlMs?: number | undefined;
    } | undefined;
    visibleWhen?: {
        field: string;
        operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
        value?: unknown;
    }[] | undefined;
    layout?: {
        colSpan?: number | undefined;
        rowSpan?: number | undefined;
        order?: number | undefined;
        width?: "full" | "half" | "third" | undefined;
    } | undefined;
    attributes?: Record<string, string | number | boolean> | undefined;
}, {
    type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
    name: string;
    options?: {
        value: string | number | boolean;
        label: string;
        description?: string | undefined;
        disabled?: boolean | undefined;
    }[] | undefined;
    validation?: {
        email?: boolean | undefined;
        url?: boolean | undefined;
        required?: string | boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        pattern?: string | undefined;
        sameAs?: string | undefined;
        customValidatorKey?: string | undefined;
    } | undefined;
    label?: string | undefined;
    description?: string | undefined;
    disabled?: boolean | undefined;
    min?: string | number | undefined;
    max?: string | number | undefined;
    placeholder?: string | undefined;
    helpText?: string | undefined;
    icon?: string | undefined;
    defaultValue?: unknown;
    readOnly?: boolean | undefined;
    isPassword?: boolean | undefined;
    inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
    autoComplete?: string | undefined;
    mask?: string | undefined;
    rows?: number | undefined;
    step?: number | undefined;
    maxSelections?: number | undefined;
    dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
    dataSource?: {
        type: "remote";
        endpoint: string;
        method?: "GET" | "POST" | undefined;
        queryParam?: string | undefined;
        payloadTemplate?: Record<string, unknown> | undefined;
        headers?: Record<string, string> | undefined;
        authTokenRef?: string | undefined;
        debounceMs?: number | undefined;
        pagination?: {
            mode: "infinite" | "paged";
            labelKey: string;
            valueKey: string;
            pageSize?: number | undefined;
            pageParam?: string | undefined;
            cursorParam?: string | undefined;
            hasMoreKey?: string | undefined;
        } | undefined;
        cacheTtlMs?: number | undefined;
    } | undefined;
    visibleWhen?: {
        field: string;
        operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
        value?: unknown;
    }[] | undefined;
    layout?: {
        colSpan?: number | undefined;
        rowSpan?: number | undefined;
        order?: number | undefined;
        width?: "full" | "half" | "third" | undefined;
    } | undefined;
    attributes?: Record<string, string | number | boolean> | undefined;
}>;
declare const formConfigSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodString;
    method: z.ZodDefault<z.ZodEnum<["POST", "PUT", "PATCH"]>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    authTokenRef: z.ZodOptional<z.ZodString>;
    fields: z.ZodArray<z.ZodEffects<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodUnion<[z.ZodLiteral<"text">, z.ZodLiteral<"email">, z.ZodLiteral<"password">, z.ZodLiteral<"textarea">, z.ZodLiteral<"number">, z.ZodLiteral<"select">, z.ZodLiteral<"multiselect">, z.ZodLiteral<"checkbox">, z.ZodLiteral<"radio">, z.ZodLiteral<"date">, z.ZodLiteral<"datetime">, z.ZodLiteral<"file">, z.ZodLiteral<"toggle">]>;
        label: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        helpText: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        defaultValue: z.ZodOptional<z.ZodUnknown>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        readOnly: z.ZodOptional<z.ZodBoolean>;
        isPassword: z.ZodOptional<z.ZodBoolean>;
        inputMode: z.ZodOptional<z.ZodEnum<["text", "email", "numeric", "tel", "url"]>>;
        autoComplete: z.ZodOptional<z.ZodString>;
        mask: z.ZodOptional<z.ZodString>;
        rows: z.ZodOptional<z.ZodNumber>;
        step: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        max: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        maxSelections: z.ZodOptional<z.ZodNumber>;
        dataType: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"number">, z.ZodLiteral<"boolean">, z.ZodLiteral<"date">, z.ZodLiteral<"datetime">, z.ZodLiteral<"enum">, z.ZodLiteral<"object">, z.ZodLiteral<"array">, z.ZodLiteral<"json">]>>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }, {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }>, "many">>;
        dataSource: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"remote">;
            endpoint: z.ZodString;
            method: z.ZodOptional<z.ZodEnum<["GET", "POST"]>>;
            queryParam: z.ZodOptional<z.ZodString>;
            payloadTemplate: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            authTokenRef: z.ZodOptional<z.ZodString>;
            debounceMs: z.ZodOptional<z.ZodNumber>;
            pagination: z.ZodOptional<z.ZodObject<{
                mode: z.ZodEnum<["infinite", "paged"]>;
                pageSize: z.ZodOptional<z.ZodNumber>;
                pageParam: z.ZodOptional<z.ZodString>;
                cursorParam: z.ZodOptional<z.ZodString>;
                labelKey: z.ZodString;
                valueKey: z.ZodString;
                hasMoreKey: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            }, {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            }>>;
            cacheTtlMs: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        }, {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        }>>;
        validation: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodObject<{
            required: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            pattern: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodBoolean>;
            url: z.ZodOptional<z.ZodBoolean>;
            sameAs: z.ZodOptional<z.ZodString>;
            customValidatorKey: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        }, {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        }>, {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        }, {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        }>, {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        }, {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        }>>;
        visibleWhen: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodString;
            operator: z.ZodEnum<["equals", "notEquals", "in", "notIn", "exists", "greaterThan", "lessThan"]>;
            value: z.ZodOptional<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }, {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }>, "many">>;
        layout: z.ZodOptional<z.ZodObject<{
            colSpan: z.ZodOptional<z.ZodNumber>;
            rowSpan: z.ZodOptional<z.ZodNumber>;
            order: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodEnum<["full", "half", "third"]>>;
        }, "strip", z.ZodTypeAny, {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        }, {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        }>>;
        attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }, {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }>, {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }, {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }>, "many">;
    steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        fields: z.ZodArray<z.ZodString, "many">;
        nextLabel: z.ZodOptional<z.ZodString>;
        previousLabel: z.ZodOptional<z.ZodString>;
        progressLabel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        fields: string[];
        description?: string | undefined;
        title?: string | undefined;
        nextLabel?: string | undefined;
        previousLabel?: string | undefined;
        progressLabel?: string | undefined;
    }, {
        id: string;
        fields: string[];
        description?: string | undefined;
        title?: string | undefined;
        nextLabel?: string | undefined;
        previousLabel?: string | undefined;
        progressLabel?: string | undefined;
    }>, "many">>;
    submit: z.ZodObject<{
        label: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "danger"]>>;
        loadingText: z.ZodOptional<z.ZodString>;
        successMessage: z.ZodOptional<z.ZodString>;
        errorMessage: z.ZodOptional<z.ZodString>;
        confirmDialog: z.ZodOptional<z.ZodObject<{
            title: z.ZodString;
            message: z.ZodString;
            confirmLabel: z.ZodOptional<z.ZodString>;
            cancelLabel: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        }, {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        icon?: string | undefined;
        variant?: "primary" | "secondary" | "danger" | undefined;
        loadingText?: string | undefined;
        successMessage?: string | undefined;
        errorMessage?: string | undefined;
        confirmDialog?: {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        } | undefined;
    }, {
        label: string;
        icon?: string | undefined;
        variant?: "primary" | "secondary" | "danger" | undefined;
        loadingText?: string | undefined;
        successMessage?: string | undefined;
        errorMessage?: string | undefined;
        confirmDialog?: {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        } | undefined;
    }>;
    onSuccessRedirect: z.ZodOptional<z.ZodString>;
    onSuccessMessage: z.ZodOptional<z.ZodString>;
    onErrorMessage: z.ZodOptional<z.ZodString>;
    draft: z.ZodOptional<z.ZodObject<{
        autosave: z.ZodOptional<z.ZodBoolean>;
        intervalMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        autosave?: boolean | undefined;
        intervalMs?: number | undefined;
    }, {
        autosave?: boolean | undefined;
        intervalMs?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    endpoint: string;
    method: "POST" | "PUT" | "PATCH";
    fields: {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }[];
    submit: {
        label: string;
        icon?: string | undefined;
        variant?: "primary" | "secondary" | "danger" | undefined;
        loadingText?: string | undefined;
        successMessage?: string | undefined;
        errorMessage?: string | undefined;
        confirmDialog?: {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    headers?: Record<string, string> | undefined;
    authTokenRef?: string | undefined;
    title?: string | undefined;
    steps?: {
        id: string;
        fields: string[];
        description?: string | undefined;
        title?: string | undefined;
        nextLabel?: string | undefined;
        previousLabel?: string | undefined;
        progressLabel?: string | undefined;
    }[] | undefined;
    onSuccessRedirect?: string | undefined;
    onSuccessMessage?: string | undefined;
    onErrorMessage?: string | undefined;
    draft?: {
        autosave?: boolean | undefined;
        intervalMs?: number | undefined;
    } | undefined;
}, {
    endpoint: string;
    fields: {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }[];
    submit: {
        label: string;
        icon?: string | undefined;
        variant?: "primary" | "secondary" | "danger" | undefined;
        loadingText?: string | undefined;
        successMessage?: string | undefined;
        errorMessage?: string | undefined;
        confirmDialog?: {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    method?: "POST" | "PUT" | "PATCH" | undefined;
    headers?: Record<string, string> | undefined;
    authTokenRef?: string | undefined;
    title?: string | undefined;
    steps?: {
        id: string;
        fields: string[];
        description?: string | undefined;
        title?: string | undefined;
        nextLabel?: string | undefined;
        previousLabel?: string | undefined;
        progressLabel?: string | undefined;
    }[] | undefined;
    onSuccessRedirect?: string | undefined;
    onSuccessMessage?: string | undefined;
    onErrorMessage?: string | undefined;
    draft?: {
        autosave?: boolean | undefined;
        intervalMs?: number | undefined;
    } | undefined;
}>, {
    endpoint: string;
    method: "POST" | "PUT" | "PATCH";
    fields: {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }[];
    submit: {
        label: string;
        icon?: string | undefined;
        variant?: "primary" | "secondary" | "danger" | undefined;
        loadingText?: string | undefined;
        successMessage?: string | undefined;
        errorMessage?: string | undefined;
        confirmDialog?: {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    headers?: Record<string, string> | undefined;
    authTokenRef?: string | undefined;
    title?: string | undefined;
    steps?: {
        id: string;
        fields: string[];
        description?: string | undefined;
        title?: string | undefined;
        nextLabel?: string | undefined;
        previousLabel?: string | undefined;
        progressLabel?: string | undefined;
    }[] | undefined;
    onSuccessRedirect?: string | undefined;
    onSuccessMessage?: string | undefined;
    onErrorMessage?: string | undefined;
    draft?: {
        autosave?: boolean | undefined;
        intervalMs?: number | undefined;
    } | undefined;
}, {
    endpoint: string;
    fields: {
        type: "number" | "text" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "datetime" | "file" | "toggle";
        name: string;
        options?: {
            value: string | number | boolean;
            label: string;
            description?: string | undefined;
            disabled?: boolean | undefined;
        }[] | undefined;
        validation?: {
            email?: boolean | undefined;
            url?: boolean | undefined;
            required?: string | boolean | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
            pattern?: string | undefined;
            sameAs?: string | undefined;
            customValidatorKey?: string | undefined;
        } | undefined;
        label?: string | undefined;
        description?: string | undefined;
        disabled?: boolean | undefined;
        min?: string | number | undefined;
        max?: string | number | undefined;
        placeholder?: string | undefined;
        helpText?: string | undefined;
        icon?: string | undefined;
        defaultValue?: unknown;
        readOnly?: boolean | undefined;
        isPassword?: boolean | undefined;
        inputMode?: "text" | "email" | "numeric" | "tel" | "url" | undefined;
        autoComplete?: string | undefined;
        mask?: string | undefined;
        rows?: number | undefined;
        step?: number | undefined;
        maxSelections?: number | undefined;
        dataType?: "string" | "number" | "boolean" | "object" | "date" | "datetime" | "enum" | "array" | "json" | undefined;
        dataSource?: {
            type: "remote";
            endpoint: string;
            method?: "GET" | "POST" | undefined;
            queryParam?: string | undefined;
            payloadTemplate?: Record<string, unknown> | undefined;
            headers?: Record<string, string> | undefined;
            authTokenRef?: string | undefined;
            debounceMs?: number | undefined;
            pagination?: {
                mode: "infinite" | "paged";
                labelKey: string;
                valueKey: string;
                pageSize?: number | undefined;
                pageParam?: string | undefined;
                cursorParam?: string | undefined;
                hasMoreKey?: string | undefined;
            } | undefined;
            cacheTtlMs?: number | undefined;
        } | undefined;
        visibleWhen?: {
            field: string;
            operator: "equals" | "notEquals" | "in" | "notIn" | "exists" | "greaterThan" | "lessThan";
            value?: unknown;
        }[] | undefined;
        layout?: {
            colSpan?: number | undefined;
            rowSpan?: number | undefined;
            order?: number | undefined;
            width?: "full" | "half" | "third" | undefined;
        } | undefined;
        attributes?: Record<string, string | number | boolean> | undefined;
    }[];
    submit: {
        label: string;
        icon?: string | undefined;
        variant?: "primary" | "secondary" | "danger" | undefined;
        loadingText?: string | undefined;
        successMessage?: string | undefined;
        errorMessage?: string | undefined;
        confirmDialog?: {
            message: string;
            title: string;
            confirmLabel?: string | undefined;
            cancelLabel?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    method?: "POST" | "PUT" | "PATCH" | undefined;
    headers?: Record<string, string> | undefined;
    authTokenRef?: string | undefined;
    title?: string | undefined;
    steps?: {
        id: string;
        fields: string[];
        description?: string | undefined;
        title?: string | undefined;
        nextLabel?: string | undefined;
        previousLabel?: string | undefined;
        progressLabel?: string | undefined;
    }[] | undefined;
    onSuccessRedirect?: string | undefined;
    onSuccessMessage?: string | undefined;
    onErrorMessage?: string | undefined;
    draft?: {
        autosave?: boolean | undefined;
        intervalMs?: number | undefined;
    } | undefined;
}>;
type FormConfigInput = z.input<typeof formConfigSchema>;
type FormConfigOutput = z.output<typeof formConfigSchema>;

export { type BackendDataType, Button, Checkbox, type DynamicDataSource, type FieldLayout, type FieldValidationRules, Form, FormBuilder, type FormBuilderProps, type FormConfig, FormConfigError, type FormConfigInput, type FormConfigOutput, FormControl, FormDescription, type FormField, type FormFieldType, FormItem, FormLabel, FormMessage, type FormProps, type FormStep, Input, type InputProps, Select, type SelectProps, type StaticOption, type SubmitAction, Switch, type SwitchProps, Textarea, type TextareaProps, type VisibilityRule, buildBackendValidator, formConfigSchema, formFieldSchema, parseFormConfig };
