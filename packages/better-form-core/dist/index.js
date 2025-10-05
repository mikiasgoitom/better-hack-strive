var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/FormBuilder.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// src/lib/formParser.ts
import { z as z2 } from "zod";

// src/lib/formSchema.ts
import { z } from "zod";
var formFieldTypeSchema = z.union([
  z.literal("text"),
  z.literal("email"),
  z.literal("password"),
  z.literal("textarea"),
  z.literal("number"),
  z.literal("select"),
  z.literal("multiselect"),
  z.literal("checkbox"),
  z.literal("radio"),
  z.literal("date"),
  z.literal("datetime"),
  z.literal("file"),
  z.literal("toggle")
]);
var backendDataTypeSchema = z.union([
  z.literal("string"),
  z.literal("number"),
  z.literal("boolean"),
  z.literal("date"),
  z.literal("datetime"),
  z.literal("enum"),
  z.literal("object"),
  z.literal("array"),
  z.literal("json")
]);
var staticOptionSchema = z.object({
  value: z.union([z.string(), z.number(), z.boolean()]),
  label: z.string(),
  description: z.string().optional(),
  disabled: z.boolean().optional()
});
var dynamicDataSourceSchema = z.object({
  type: z.literal("remote"),
  endpoint: z.string().min(1, "Endpoint is required"),
  method: z.enum(["GET", "POST"]).optional(),
  queryParam: z.string().optional(),
  payloadTemplate: z.record(z.unknown()).optional(),
  headers: z.record(z.string()).optional(),
  authTokenRef: z.string().optional(),
  debounceMs: z.number().int().nonnegative().optional(),
  pagination: z.object({
    mode: z.enum(["infinite", "paged"]),
    pageSize: z.number().int().positive().optional(),
    pageParam: z.string().optional(),
    cursorParam: z.string().optional(),
    labelKey: z.string().min(1),
    valueKey: z.string().min(1),
    hasMoreKey: z.string().optional()
  }).optional(),
  cacheTtlMs: z.number().int().nonnegative().optional()
});
var formFieldValidationSchema = z.object({
  required: z.union([z.boolean(), z.string()]).optional(),
  minLength: z.number().int().nonnegative().optional(),
  maxLength: z.number().int().nonnegative().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  pattern: z.string().optional(),
  email: z.boolean().optional(),
  url: z.boolean().optional(),
  sameAs: z.string().optional(),
  customValidatorKey: z.string().optional()
}).refine(
  (schema) => {
    if (schema.minLength !== void 0 && schema.maxLength !== void 0) {
      return schema.minLength <= schema.maxLength;
    }
    return true;
  },
  {
    message: "minLength cannot be greater than maxLength",
    path: ["maxLength"]
  }
).refine(
  (schema) => {
    if (schema.min !== void 0 && schema.max !== void 0) {
      return schema.min <= schema.max;
    }
    return true;
  },
  {
    message: "min cannot be greater than max",
    path: ["max"]
  }
);
var visibilityRuleSchema = z.object({
  field: z.string().min(1, "Visibility rule requires a field"),
  operator: z.enum([
    "equals",
    "notEquals",
    "in",
    "notIn",
    "exists",
    "greaterThan",
    "lessThan"
  ]),
  value: z.unknown().optional()
});
var layoutSchema = z.object({
  colSpan: z.number().int().positive().max(12).optional(),
  rowSpan: z.number().int().positive().optional(),
  order: z.number().int().nonnegative().optional(),
  width: z.enum(["full", "half", "third"]).optional()
});
var formStepSchema = z.object({
  id: z.string().min(1, "Step id is required"),
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(z.string().min(1)).min(1, "Step must reference at least one field"),
  nextLabel: z.string().optional(),
  previousLabel: z.string().optional(),
  progressLabel: z.string().optional()
});
var formFieldSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  type: formFieldTypeSchema,
  label: z.string().optional(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  helpText: z.string().optional(),
  icon: z.string().optional(),
  defaultValue: z.unknown().optional(),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
  isPassword: z.boolean().optional(),
  inputMode: z.enum(["text", "email", "numeric", "tel", "url"]).optional(),
  autoComplete: z.string().optional(),
  mask: z.string().optional(),
  rows: z.number().int().positive().optional(),
  step: z.number().optional(),
  min: z.union([z.number(), z.string()]).optional(),
  max: z.union([z.number(), z.string()]).optional(),
  maxSelections: z.number().int().positive().optional(),
  dataType: backendDataTypeSchema.optional(),
  options: z.array(staticOptionSchema).optional(),
  dataSource: dynamicDataSourceSchema.optional(),
  validation: formFieldValidationSchema.optional(),
  visibleWhen: z.array(visibilityRuleSchema).optional(),
  layout: layoutSchema.optional(),
  attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
}).superRefine((field, ctx) => {
  if (field.type === "password" && field.isPassword === false) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password fields should not explicitly set isPassword to false",
      path: ["isPassword"]
    });
  }
  if (field.type !== "password" && field.isPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Only password fields can set isPassword",
      path: ["isPassword"]
    });
  }
  if (["select", "multiselect", "radio"].includes(field.type) && !field.options && !field.dataSource) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Select-like fields require options or a dataSource",
      path: ["options"]
    });
  }
  if (field.type === "multiselect" && field.maxSelections === 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Use type 'select' instead of limiting multiselect to one option",
      path: ["maxSelections"]
    });
  }
});
var submitActionSchema = z.object({
  label: z.string().min(1, "Submit button requires a label"),
  icon: z.string().optional(),
  variant: z.enum(["primary", "secondary", "danger"]).optional(),
  loadingText: z.string().optional(),
  successMessage: z.string().optional(),
  errorMessage: z.string().optional(),
  confirmDialog: z.object({
    title: z.string().min(1),
    message: z.string().min(1),
    confirmLabel: z.string().optional(),
    cancelLabel: z.string().optional()
  }).optional()
});
var formConfigSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  endpoint: z.string().min(1, "Form endpoint is required"),
  method: z.enum(["POST", "PUT", "PATCH"]).default("POST"),
  headers: z.record(z.string()).optional(),
  authTokenRef: z.string().optional(),
  fields: z.array(formFieldSchema).min(1, "At least one field is required"),
  steps: z.array(formStepSchema).optional(),
  submit: submitActionSchema,
  onSuccessRedirect: z.string().optional(),
  onSuccessMessage: z.string().optional(),
  onErrorMessage: z.string().optional(),
  draft: z.object({
    autosave: z.boolean().optional(),
    intervalMs: z.number().int().positive().optional()
  }).optional()
}).superRefine((config, ctx) => {
  var _a;
  const fieldNames = /* @__PURE__ */ new Set();
  config.fields.forEach((field, index) => {
    if (fieldNames.has(field.name)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate field name: ${field.name}`,
        path: ["fields", index, "name"]
      });
    }
    fieldNames.add(field.name);
  });
  config.fields.forEach((field, index) => {
    var _a2;
    const sameAs = (_a2 = field.validation) == null ? void 0 : _a2.sameAs;
    if (sameAs && !fieldNames.has(sameAs)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `sameAs target '${sameAs}' does not exist`,
        path: ["fields", index, "validation", "sameAs"]
      });
    }
  });
  if ((_a = config.steps) == null ? void 0 : _a.length) {
    const stepIds = /* @__PURE__ */ new Set();
    const referencedFields = /* @__PURE__ */ new Set();
    config.steps.forEach((step, stepIndex) => {
      if (stepIds.has(step.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate step id: ${step.id}`,
          path: ["steps", stepIndex, "id"]
        });
      }
      stepIds.add(step.id);
      const localFieldSet = /* @__PURE__ */ new Set();
      step.fields.forEach((fieldName, fieldIndex) => {
        if (!fieldNames.has(fieldName)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Step references unknown field '${fieldName}'`,
            path: ["steps", stepIndex, "fields", fieldIndex]
          });
          return;
        }
        if (referencedFields.has(fieldName)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Field '${fieldName}' is already assigned to a previous step`,
            path: ["steps", stepIndex, "fields", fieldIndex]
          });
        }
        if (localFieldSet.has(fieldName)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Field '${fieldName}' is listed more than once in step '${step.id}'`,
            path: ["steps", stepIndex, "fields", fieldIndex]
          });
        }
        localFieldSet.add(fieldName);
        referencedFields.add(fieldName);
      });
    });
    if (referencedFields.size === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Steps must reference at least one defined field",
        path: ["steps"]
      });
    }
  }
});

// src/lib/formParser.ts
var FormConfigError = class extends Error {
  constructor(message, issues) {
    super(message);
    this.name = "FormConfigError";
    this.issues = issues;
  }
};
function parseFormConfig(input) {
  const source = typeof input === "string" ? safeJsonParse(input) : input;
  const result = formConfigSchema.safeParse(source);
  if (!result.success) {
    throw new FormConfigError(
      "Invalid form configuration",
      result.error.issues
    );
  }
  return result.data;
}
function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new FormConfigError("Failed to parse JSON form configuration", [
      {
        code: z2.ZodIssueCode.custom,
        message: error instanceof Error ? error.message : "Unknown JSON parse error",
        path: []
      }
    ]);
  }
}
var literalFromValue = (value) => {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return z2.literal(value);
  }
  return null;
};
var arrayOf = (schema, field) => {
  var _a, _b, _c;
  let arraySchema = z2.array(schema);
  const minLength = (_a = field.validation) == null ? void 0 : _a.minLength;
  if (minLength !== void 0) {
    arraySchema = arraySchema.min(minLength, {
      message: typeof ((_b = field.validation) == null ? void 0 : _b.required) === "string" ? field.validation.required : `Select at least ${minLength} options`
    });
  }
  const maxLength = (_c = field.validation) == null ? void 0 : _c.maxLength;
  if (maxLength !== void 0) {
    arraySchema = arraySchema.max(maxLength, {
      message: `Select at most ${maxLength} options`
    });
  }
  if (field.maxSelections !== void 0) {
    arraySchema = arraySchema.max(field.maxSelections, {
      message: `Select no more than ${field.maxSelections} options`
    });
  }
  return arraySchema;
};
var deriveDataType = (field) => {
  var _a;
  if (field.dataType) {
    return field.dataType;
  }
  const inferredByType = {
    text: "string",
    email: "string",
    password: "string",
    textarea: "string",
    number: "number",
    select: inferSelectDataType(field),
    multiselect: "array",
    checkbox: "boolean",
    radio: inferSelectDataType(field),
    date: "date",
    datetime: "datetime",
    file: "string",
    toggle: "boolean"
  };
  return (_a = inferredByType[field.type]) != null ? _a : "json";
};
var inferSelectDataType = (field) => {
  var _a;
  const firstOption = (_a = field.options) == null ? void 0 : _a[0];
  if (!firstOption) {
    return "string";
  }
  const value = firstOption.value;
  switch (typeof value) {
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "string";
  }
};
var applyStringConstraints = (schema, field) => {
  const { validation } = field;
  let result = schema;
  if ((validation == null ? void 0 : validation.minLength) !== void 0) {
    result = result.min(validation.minLength, {
      message: `Must be at least ${validation.minLength} characters`
    });
  }
  if ((validation == null ? void 0 : validation.maxLength) !== void 0) {
    result = result.max(validation.maxLength, {
      message: `Must be at most ${validation.maxLength} characters`
    });
  }
  if (validation == null ? void 0 : validation.pattern) {
    try {
      const regex = new RegExp(validation.pattern);
      result = result.regex(regex, {
        message: "Value does not match required pattern"
      });
    } catch (error) {
      throw new FormConfigError(
        `Invalid regex pattern for field '${field.name}'`,
        [
          {
            code: z2.ZodIssueCode.custom,
            message: error instanceof Error ? error.message : "Invalid regex",
            path: ["fields", field.name, "validation", "pattern"]
          }
        ]
      );
    }
  }
  if (validation == null ? void 0 : validation.email) {
    result = result.email();
  }
  if (validation == null ? void 0 : validation.url) {
    result = result.url();
  }
  return result;
};
var applyNumberConstraints = (schema, field) => {
  const { validation } = field;
  let result = schema;
  if ((validation == null ? void 0 : validation.min) !== void 0) {
    result = result.min(validation.min, {
      message: `Must be greater than or equal to ${validation.min}`
    });
  }
  if ((validation == null ? void 0 : validation.max) !== void 0) {
    result = result.max(validation.max, {
      message: `Must be less than or equal to ${validation.max}`
    });
  }
  if (field.step !== void 0 && field.step > 0) {
    const stepValue = field.step;
    const reference = typeof field.min === "number" ? field.min : 0;
    result = result.refine(
      (value) => {
        const delta = value - reference;
        return Math.abs(delta / stepValue - Math.round(delta / stepValue)) < Number.EPSILON;
      },
      {
        message: `Must align with step ${stepValue}`
      }
    );
  }
  return result;
};
var buildLiteralUnion = (field) => {
  var _a;
  if (!((_a = field.options) == null ? void 0 : _a.length)) {
    return void 0;
  }
  const literals = field.options.map((option) => literalFromValue(option.value)).filter(
    (literal) => literal !== null
  );
  if (!literals.length) {
    return void 0;
  }
  if (literals.length === 1) {
    return literals[0];
  }
  return z2.union(
    literals
  );
};
var buildFieldSchema = (field) => {
  var _a;
  const dataType = deriveDataType(field);
  let baseSchema;
  switch (dataType) {
    case "number":
      baseSchema = z2.number({ invalid_type_error: "Must be a number" });
      break;
    case "boolean":
      baseSchema = z2.boolean({ invalid_type_error: "Must be a boolean" });
      break;
    case "date":
      baseSchema = z2.string().min(1, { message: "Date is required" }).refine((value) => !Number.isNaN(Date.parse(value)), {
        message: "Must be a valid ISO date string"
      });
      break;
    case "datetime":
      baseSchema = z2.string().datetime();
      break;
    case "array":
      baseSchema = z2.array(z2.unknown());
      break;
    case "object":
      baseSchema = z2.record(z2.unknown());
      break;
    case "json":
      baseSchema = z2.unknown();
      break;
    default:
      baseSchema = z2.string();
      break;
  }
  if (dataType === "string") {
    baseSchema = applyStringConstraints(baseSchema, field);
  }
  if (dataType === "number") {
    baseSchema = applyNumberConstraints(baseSchema, field);
  }
  if (field.type === "select" || field.type === "radio") {
    const union = buildLiteralUnion(field);
    if (union) {
      baseSchema = union;
    }
  }
  if (field.type === "multiselect") {
    const union = buildLiteralUnion(field);
    const fallbackItemSchema = (() => {
      var _a2, _b;
      const sample = (_b = (_a2 = field.options) == null ? void 0 : _a2[0]) == null ? void 0 : _b.value;
      if (typeof sample === "number") return z2.number();
      if (typeof sample === "boolean") return z2.boolean();
      return z2.string();
    })();
    const itemSchema = union != null ? union : fallbackItemSchema;
    baseSchema = arrayOf(itemSchema, field);
  }
  if (field.type === "checkbox" || field.type === "toggle") {
    baseSchema = z2.boolean();
  }
  const requiredSetting = (_a = field.validation) == null ? void 0 : _a.required;
  const isRequired = requiredSetting === void 0 ? true : Boolean(requiredSetting);
  if (isRequired && dataType === "string") {
    baseSchema = baseSchema.min(1, {
      message: typeof requiredSetting === "string" ? requiredSetting : "This field is required"
    });
  }
  if (!isRequired) {
    baseSchema = baseSchema.optional();
  }
  if (field.defaultValue !== void 0) {
    baseSchema = baseSchema.optional().default(field.defaultValue);
  }
  return baseSchema;
};
function buildBackendValidator(config) {
  const normalized = parseFormConfig(config);
  const fieldSchemas = {};
  normalized.fields.forEach((field) => {
    fieldSchemas[field.name] = buildFieldSchema(field);
  });
  const fieldsWithSameAs = normalized.fields.filter(
    (field) => {
      var _a;
      return (_a = field.validation) == null ? void 0 : _a.sameAs;
    }
  );
  const baseSchema = z2.object(fieldSchemas);
  if (!fieldsWithSameAs.length) {
    return baseSchema;
  }
  return baseSchema.superRefine((data, ctx) => {
    fieldsWithSameAs.forEach((field) => {
      var _a, _b;
      const target = (_a = field.validation) == null ? void 0 : _a.sameAs;
      if (!target) return;
      if (data[field.name] !== data[target]) {
        ctx.addIssue({
          code: z2.ZodIssueCode.custom,
          message: `${(_b = field.label) != null ? _b : field.name} must match ${target}`,
          path: [field.name]
        });
      }
    });
  });
}

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button(_a) {
  var _b = _a, {
    className,
    variant,
    size,
    asChild = false
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size",
    "asChild"
  ]);
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    __spreadValues({
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className }))
    }, props)
  );
}

// src/components/ui/checkbox.tsx
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Checkbox(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx2(
    CheckboxPrimitive.Root,
    __spreadProps(__spreadValues({
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx2(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx2(CheckIcon, { className: "size-3.5" })
        }
      )
    })
  );
}

// src/components/ui/form.tsx
import * as React from "react";
import { FormProvider } from "react-hook-form";
import { jsx as jsx3 } from "react/jsx-runtime";
function Form(_a) {
  var _b = _a, {
    form,
    children,
    className
  } = _b, props = __objRest(_b, [
    "form",
    "children",
    "className"
  ]);
  return /* @__PURE__ */ jsx3(FormProvider, __spreadProps(__spreadValues({}, form), { children: /* @__PURE__ */ jsx3("form", __spreadProps(__spreadValues({ className }, props), { children })) }));
}
var FormItem = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx3("div", __spreadValues({ ref, className: cn("space-y-2", className) }, props));
  }
);
FormItem.displayName = "FormItem";
var FormLabel = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx3(
    "label",
    __spreadValues({
      ref,
      className: cn("text-sm font-medium", className)
    }, props)
  );
});
FormLabel.displayName = "FormLabel";
var FormDescription = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx3(
    "p",
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx3(
    "p",
    __spreadValues({
      ref,
      className: cn("text-sm text-destructive", className)
    }, props)
  );
});
FormMessage.displayName = "FormMessage";
var FormControl = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx3(
    "div",
    __spreadValues({
      ref,
      className: cn("flex flex-col space-y-2", className)
    }, props)
  );
});
FormControl.displayName = "FormControl";

// src/components/ui/input.tsx
import * as React2 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var Input = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type = "text" } = _b, props = __objRest(_b, ["className", "type"]);
    return /* @__PURE__ */ jsx4(
      "input",
      __spreadValues({
        ref,
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )
      }, props)
    );
  }
);
Input.displayName = "Input";

// src/components/ui/select.tsx
import * as React3 from "react";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var Select = React3.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, children, error } = _b, props = __objRest(_b, ["className", "children", "error"]);
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx5(
        "select",
        __spreadProps(__spreadValues({
          ref,
          className: cn(
            "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive" : void 0,
            className
          )
        }, props), {
          children
        })
      ),
      /* @__PURE__ */ jsx5("span", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs", children: "\u25BE" })
    ] });
  }
);
Select.displayName = "Select";

// src/components/ui/switch.tsx
import * as React4 from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Switch = React4.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, checked, onCheckedChange, disabled } = _b, props = __objRest(_b, ["className", "checked", "onCheckedChange", "disabled"]);
    return /* @__PURE__ */ jsx6(
      "button",
      __spreadProps(__spreadValues({
        ref,
        type: "button",
        role: "switch",
        "aria-checked": checked,
        disabled,
        onClick: () => onCheckedChange == null ? void 0 : onCheckedChange(!checked),
        className: cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary" : "bg-input",
          className
        )
      }, props), {
        children: /* @__PURE__ */ jsx6(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow transition-transform",
              checked ? "translate-x-5" : "translate-x-0"
            )
          }
        )
      })
    );
  }
);
Switch.displayName = "Switch";

// src/components/ui/textarea.tsx
import * as React5 from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Textarea = React5.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx7(
      "textarea",
      __spreadValues({
        ref,
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )
      }, props)
    );
  }
);
Textarea.displayName = "Textarea";

// src/components/FormBuilder.tsx
import { jsx as jsx8, jsxs as jsxs2 } from "react/jsx-runtime";
var getColSpanClass = (field) => {
  var _a, _b;
  if ((_a = field.layout) == null ? void 0 : _a.colSpan) {
    return `md:col-span-${field.layout.colSpan}`;
  }
  switch ((_b = field.layout) == null ? void 0 : _b.width) {
    case "half":
      return "md:col-span-6";
    case "third":
      return "md:col-span-4";
    default:
      return "md:col-span-12";
  }
};
var evaluateVisibility = (rules, values) => {
  if (!(rules == null ? void 0 : rules.length)) {
    return true;
  }
  return rules.every((rule) => {
    const target = values[rule.field];
    switch (rule.operator) {
      case "equals":
        return target === rule.value;
      case "notEquals":
        return target !== rule.value;
      case "in":
        return Array.isArray(rule.value) ? rule.value.includes(target) : false;
      case "notIn":
        return Array.isArray(rule.value) ? !rule.value.includes(target) : true;
      case "exists":
        return target !== void 0 && target !== null && target !== "";
      case "greaterThan":
        return typeof target === "number" && typeof rule.value === "number" ? target > rule.value : false;
      case "lessThan":
        return typeof target === "number" && typeof rule.value === "number" ? target < rule.value : false;
      default:
        return true;
    }
  });
};
var extractRemoteOptions = (payload, labelKey, valueKey) => {
  const candidates = Array.isArray(payload) ? payload : Array.isArray(payload == null ? void 0 : payload.data) ? payload.data : Array.isArray(payload == null ? void 0 : payload.items) ? payload.items : Array.isArray(payload == null ? void 0 : payload.results) ? payload.results : [];
  return candidates.map((item) => {
    if (!item || typeof item !== "object") {
      return null;
    }
    const record = item;
    const label = record[labelKey];
    const value = record[valueKey];
    if ((typeof label === "string" || typeof label === "number") && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) {
      return {
        label: String(label),
        value
      };
    }
    return null;
  }).filter((option) => option !== null);
};
var useFieldOptions = (field, fetcher) => {
  var _a;
  const [state, setState] = useState({
    options: (_a = field.options) != null ? _a : [],
    loading: Boolean(field.dataSource),
    error: null
  });
  useEffect(() => {
    var _a2;
    setState({
      options: (_a2 = field.options) != null ? _a2 : [],
      loading: Boolean(field.dataSource),
      error: null
    });
  }, [field.options, field.dataSource]);
  useEffect(() => {
    if (!field.dataSource) {
      return;
    }
    const dataSource = field.dataSource;
    let cancelled = false;
    const abortController = new AbortController();
    async function load() {
      var _a2, _b, _c, _d, _e, _f;
      setState((prev) => __spreadProps(__spreadValues({}, prev), { loading: true, error: null }));
      try {
        const response = await fetcher(dataSource.endpoint, {
          method: (_a2 = dataSource.method) != null ? _a2 : "GET",
          headers: __spreadValues(__spreadValues({}, dataSource.method === "POST" ? { "Content-Type": "application/json" } : {}), dataSource.headers),
          body: dataSource.method === "POST" && dataSource.payloadTemplate ? JSON.stringify(dataSource.payloadTemplate) : void 0,
          signal: abortController.signal
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const json = await response.json();
        const labelKey = (_c = (_b = dataSource.pagination) == null ? void 0 : _b.labelKey) != null ? _c : "label";
        const valueKey = (_e = (_d = dataSource.pagination) == null ? void 0 : _d.valueKey) != null ? _e : "value";
        const options = extractRemoteOptions(json, labelKey, valueKey);
        if (!cancelled) {
          setState({ options, loading: false, error: null });
        }
      } catch (error) {
        if (cancelled) {
          return;
        }
        setState({
          options: (_f = field.options) != null ? _f : [],
          loading: false,
          error: error instanceof Error ? error.message : "Failed to load options"
        });
      }
    }
    load();
    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [field.dataSource, field.options, fetcher]);
  return state;
};
var FieldRenderer = ({
  field,
  control,
  renderFieldControl,
  error,
  isVisible,
  fetcher
}) => {
  var _a;
  const optionsState = useFieldOptions(field, fetcher);
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsx8("div", { className: cn("space-y-2", getColSpanClass(field)), children: /* @__PURE__ */ jsxs2(FormItem, { children: [
    field.label && /* @__PURE__ */ jsx8(FormLabel, { htmlFor: field.name, children: field.label }),
    /* @__PURE__ */ jsx8(FormControl, { children: /* @__PURE__ */ jsx8(
      Controller,
      {
        name: field.name,
        control,
        render: ({ field: fieldProps }) => renderFieldControl(field, fieldProps, optionsState)
      }
    ) }),
    field.description && /* @__PURE__ */ jsx8(FormDescription, { children: field.description }),
    field.helpText && /* @__PURE__ */ jsx8(FormDescription, { children: field.helpText }),
    optionsState.loading && /* @__PURE__ */ jsx8(FormDescription, { children: "Loading options\u2026" }),
    (error || optionsState.error) && /* @__PURE__ */ jsx8(FormMessage, { children: (_a = error != null ? error : optionsState.error) != null ? _a : "" })
  ] }) });
};
var FormBuilder = ({
  config,
  onSubmitError,
  onSubmitSuccess,
  fetcher = fetch,
  onRedirect
}) => {
  var _a, _b, _c, _d, _e;
  const normalizedConfig = useMemo(() => parseFormConfig(config), [config]);
  const schema = useMemo(
    () => buildBackendValidator(normalizedConfig),
    [normalizedConfig]
  );
  const steps = useMemo(() => {
    const base = normalizedConfig.steps && normalizedConfig.steps.length > 0 ? normalizedConfig.steps : [
      {
        id: "__all__",
        title: normalizedConfig.title,
        description: normalizedConfig.description,
        fields: normalizedConfig.fields.map((field) => field.name)
      }
    ];
    const sanitized = base.map((step) => __spreadProps(__spreadValues({}, step), {
      fields: step.fields.filter(
        (fieldName) => normalizedConfig.fields.some((field) => field.name === fieldName)
      )
    })).filter((step) => step.fields.length > 0);
    if (sanitized.length === 0) {
      return [
        {
          id: "__all__",
          title: normalizedConfig.title,
          description: normalizedConfig.description,
          fields: normalizedConfig.fields.map((field) => field.name)
        }
      ];
    }
    return sanitized;
  }, [normalizedConfig]);
  const isMultiStep = normalizedConfig.steps !== void 0 && steps.length > 1;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [steps]);
  const currentStep = (_a = steps[currentStepIndex]) != null ? _a : steps[0];
  const fieldMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    normalizedConfig.fields.forEach((field) => {
      map.set(field.name, field);
    });
    return map;
  }, [normalizedConfig.fields]);
  const fieldsForCurrentStep = useMemo(() => {
    if (!currentStep) {
      return normalizedConfig.fields;
    }
    return currentStep.fields.map((fieldName) => fieldMap.get(fieldName)).filter((field) => Boolean(field));
  }, [currentStep, fieldMap, normalizedConfig.fields]);
  const defaultValues = useMemo(() => {
    const values = {};
    normalizedConfig.fields.forEach((field) => {
      if (field.defaultValue !== void 0) {
        values[field.name] = field.defaultValue;
        return;
      }
      if (field.type === "checkbox" || field.type === "toggle") {
        values[field.name] = false;
        return;
      }
      if (field.type === "multiselect") {
        values[field.name] = [];
      }
    });
    return values;
  }, [normalizedConfig]);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit"
  });
  const [submissionState, setSubmissionState] = useState({ status: "idle" });
  const submitHandler = form.handleSubmit(async (values) => {
    var _a2, _b2, _c2;
    try {
      const response = await fetcher(normalizedConfig.endpoint, {
        method: (_a2 = normalizedConfig.method) != null ? _a2 : "POST",
        headers: __spreadValues({
          "Content-Type": "application/json"
        }, normalizedConfig.headers),
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setSubmissionState({
        status: "success",
        message: normalizedConfig.submit.successMessage
      });
      onSubmitSuccess == null ? void 0 : onSubmitSuccess(values);
      if (normalizedConfig.onSuccessRedirect) {
        if (onRedirect) {
          onRedirect(normalizedConfig.onSuccessRedirect);
        } else if (typeof window !== "undefined") {
          window.location.assign(normalizedConfig.onSuccessRedirect);
        }
      }
    } catch (error) {
      setSubmissionState({
        status: "error",
        message: (_c2 = (_b2 = normalizedConfig.submit.errorMessage) != null ? _b2 : normalizedConfig.onErrorMessage) != null ? _c2 : "An unexpected error occurred"
      });
      onSubmitError == null ? void 0 : onSubmitError(error);
    }
  });
  const renderFieldControl = useCallback(
    (field, fieldProps, optionsState) => {
      var _a2, _b2, _c2, _d2;
      const commonProps = {
        placeholder: field.placeholder,
        disabled: field.disabled,
        "aria-label": (_a2 = field.label) != null ? _a2 : field.placeholder
      };
      const rawValue = fieldProps.value;
      const normalizeTextValue = (value) => value === null || value === void 0 ? "" : typeof value === "string" ? value : String(value);
      const resolveOptionValue = (raw) => {
        const match = optionsState.options.find(
          (option) => String(option.value) === raw
        );
        return match ? match.value : raw;
      };
      switch (field.type) {
        case "textarea":
          return /* @__PURE__ */ jsx8(
            Textarea,
            __spreadProps(__spreadValues({}, commonProps), {
              rows: field.rows,
              value: normalizeTextValue(rawValue),
              onChange: (event) => fieldProps.onChange(event.target.value)
            })
          );
        case "number":
          return /* @__PURE__ */ jsx8(
            Input,
            __spreadProps(__spreadValues({}, commonProps), {
              type: "number",
              value: typeof rawValue === "number" ? rawValue : normalizeTextValue(rawValue),
              step: field.step,
              min: field.min,
              max: field.max,
              onChange: (event) => {
                const nextValue = event.target.value;
                fieldProps.onChange(
                  nextValue === "" ? void 0 : Number(nextValue)
                );
              }
            })
          );
        case "select":
          return /* @__PURE__ */ jsxs2(
            Select,
            __spreadProps(__spreadValues({}, commonProps), {
              disabled: field.disabled || optionsState.loading,
              value: normalizeTextValue(rawValue),
              onChange: (event) => {
                const nextValue = event.target.value;
                if (nextValue === "") {
                  fieldProps.onChange(void 0);
                  return;
                }
                fieldProps.onChange(resolveOptionValue(nextValue));
              },
              children: [
                /* @__PURE__ */ jsx8("option", { value: "", disabled: Boolean((_b2 = field.validation) == null ? void 0 : _b2.required), children: (_c2 = field.placeholder) != null ? _c2 : "Select an option" }),
                optionsState.options.map((option) => /* @__PURE__ */ jsx8("option", { value: String(option.value), children: option.label }, String(option.value)))
              ]
            })
          );
        case "multiselect":
          return /* @__PURE__ */ jsx8(
            Select,
            __spreadProps(__spreadValues({}, commonProps), {
              multiple: true,
              disabled: field.disabled || optionsState.loading,
              value: Array.isArray(rawValue) ? rawValue.map((item) => String(item)) : [],
              onChange: (event) => {
                const selected = Array.from(event.target.selectedOptions).map(
                  (opt) => resolveOptionValue(opt.value)
                );
                fieldProps.onChange(selected);
              },
              size: Math.min(optionsState.options.length || 3, 6),
              children: optionsState.options.map((option) => /* @__PURE__ */ jsx8("option", { value: String(option.value), children: option.label }, String(option.value)))
            })
          );
        case "checkbox":
          return /* @__PURE__ */ jsxs2("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx8(
              Checkbox,
              {
                "aria-label": (_d2 = field.label) != null ? _d2 : field.placeholder,
                disabled: field.disabled,
                checked: Boolean(rawValue),
                onCheckedChange: (checked) => fieldProps.onChange(Boolean(checked))
              }
            ),
            field.placeholder && /* @__PURE__ */ jsx8("span", { className: "text-sm text-muted-foreground", children: field.placeholder })
          ] });
        case "toggle":
          return /* @__PURE__ */ jsx8(
            Switch,
            {
              checked: Boolean(rawValue),
              onCheckedChange: (checked) => fieldProps.onChange(checked),
              disabled: field.disabled
            }
          );
        case "radio":
          return /* @__PURE__ */ jsx8("div", { className: "grid gap-2", children: optionsState.options.map((option) => /* @__PURE__ */ jsxs2(
            "label",
            {
              className: "flex items-center space-x-2 text-sm",
              children: [
                /* @__PURE__ */ jsx8(
                  "input",
                  {
                    type: "radio",
                    name: fieldProps.name,
                    value: String(option.value),
                    checked: String(rawValue) === String(option.value),
                    onChange: () => fieldProps.onChange(option.value),
                    className: "h-4 w-4",
                    disabled: field.disabled
                  }
                ),
                /* @__PURE__ */ jsx8("span", { children: option.label })
              ]
            },
            String(option.value)
          )) });
        case "date":
          return /* @__PURE__ */ jsx8(
            Input,
            __spreadProps(__spreadValues({}, commonProps), {
              type: "date",
              value: normalizeTextValue(rawValue).slice(0, 10),
              onChange: (event) => fieldProps.onChange(event.target.value || void 0)
            })
          );
        case "datetime":
          return /* @__PURE__ */ jsx8(
            Input,
            __spreadProps(__spreadValues({}, commonProps), {
              type: "datetime-local",
              value: normalizeTextValue(rawValue).slice(0, 16),
              onChange: (event) => fieldProps.onChange(event.target.value || void 0)
            })
          );
        case "file":
          return /* @__PURE__ */ jsx8(
            Input,
            __spreadProps(__spreadValues({}, commonProps), {
              type: "file",
              onChange: (event) => {
                var _a3, _b3;
                const file = (_b3 = (_a3 = event.target.files) == null ? void 0 : _a3[0]) != null ? _b3 : null;
                fieldProps.onChange(file);
              }
            })
          );
        default:
          return /* @__PURE__ */ jsx8(
            Input,
            __spreadProps(__spreadValues({}, commonProps), {
              type: field.isPassword ? "password" : field.type === "email" ? "email" : "text",
              value: normalizeTextValue(rawValue),
              autoComplete: field.autoComplete,
              onChange: (event) => fieldProps.onChange(event.target.value)
            })
          );
      }
    },
    []
  );
  const watchValues = form.watch();
  const visibleFieldNames = fieldsForCurrentStep.filter(
    (field) => evaluateVisibility(
      field.visibleWhen,
      watchValues
    )
  ).map((field) => field.name);
  const handleNext = async () => {
    const validationTargets = visibleFieldNames.length ? visibleFieldNames : fieldsForCurrentStep.map((field) => field.name);
    const isValid = await form.trigger(validationTargets, {
      shouldFocus: true
    });
    if (isValid) {
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  const handlePrevious = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };
  const isLastStep = currentStepIndex === steps.length - 1;
  const progressLabel = (currentStep == null ? void 0 : currentStep.progressLabel) ? currentStep.progressLabel : `Step ${Math.min(currentStepIndex + 1, steps.length)} of ${steps.length}`;
  return /* @__PURE__ */ jsxs2(Form, { form, onSubmit: submitHandler, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs2("div", { className: "space-y-2 text-center", children: [
      normalizedConfig.title && /* @__PURE__ */ jsx8("h1", { className: "text-2xl font-semibold", children: normalizedConfig.title }),
      isMultiStep && currentStep && /* @__PURE__ */ jsx8("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: progressLabel }),
      isMultiStep && (currentStep == null ? void 0 : currentStep.title) && /* @__PURE__ */ jsx8("h2", { className: "text-lg font-medium", children: currentStep.title }),
      (isMultiStep ? currentStep == null ? void 0 : currentStep.description : normalizedConfig.description) && /* @__PURE__ */ jsx8("p", { className: "text-sm text-muted-foreground", children: isMultiStep ? (_b = currentStep == null ? void 0 : currentStep.description) != null ? _b : normalizedConfig.description : normalizedConfig.description })
    ] }),
    /* @__PURE__ */ jsx8("div", { className: "grid gap-6 md:grid-cols-12", children: fieldsForCurrentStep.map((field) => {
      var _a2;
      const fieldError = form.formState.errors[field.name];
      const isVisible = visibleFieldNames.includes(field.name);
      return /* @__PURE__ */ jsx8(
        FieldRenderer,
        {
          field,
          control: form.control,
          renderFieldControl,
          error: typeof (fieldError == null ? void 0 : fieldError.message) === "string" ? fieldError.message : (_a2 = fieldError == null ? void 0 : fieldError.message) == null ? void 0 : _a2.toString(),
          isVisible,
          fetcher
        },
        field.name
      );
    }) }),
    submissionState.status === "success" && submissionState.message && /* @__PURE__ */ jsx8("p", { className: "text-sm text-green-600", children: submissionState.message }),
    submissionState.status === "error" && submissionState.message && /* @__PURE__ */ jsx8("p", { className: "text-sm text-destructive", children: submissionState.message }),
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      isMultiStep && currentStepIndex > 0 && /* @__PURE__ */ jsx8(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: handlePrevious,
          disabled: form.formState.isSubmitting,
          children: (_c = currentStep == null ? void 0 : currentStep.previousLabel) != null ? _c : "Back"
        }
      ),
      isLastStep ? /* @__PURE__ */ jsx8(
        Button,
        {
          type: "submit",
          className: "w-full sm:ml-auto sm:w-auto",
          disabled: form.formState.isSubmitting,
          children: form.formState.isSubmitting ? (_d = normalizedConfig.submit.loadingText) != null ? _d : "Submitting\u2026" : normalizedConfig.submit.label
        }
      ) : /* @__PURE__ */ jsx8(
        Button,
        {
          type: "button",
          className: "w-full sm:ml-auto sm:w-auto",
          onClick: handleNext,
          disabled: form.formState.isSubmitting,
          children: (_e = currentStep == null ? void 0 : currentStep.nextLabel) != null ? _e : "Next"
        }
      )
    ] })
  ] });
};
export {
  Button,
  Checkbox,
  Form,
  FormBuilder,
  FormConfigError,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  Switch,
  Textarea,
  buildBackendValidator,
  formConfigSchema,
  formFieldSchema,
  parseFormConfig
};
//# sourceMappingURL=index.js.map