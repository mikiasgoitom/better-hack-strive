export { FormBuilder, type FormBuilderProps } from "./components/FormBuilder";
export { Button } from "./components/ui/button";
export { Checkbox } from "./components/ui/checkbox";
export {
  Form,
  type FormProps,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
export { Input, type InputProps } from "./components/ui/input";
export { Select, type SelectProps } from "./components/ui/select";
export { Switch, type SwitchProps } from "./components/ui/switch";
export { Textarea, type TextareaProps } from "./components/ui/textarea";
export {
  FormConfigError,
  buildBackendValidator,
  parseFormConfig,
} from "./lib/formParser";
export {
  formConfigSchema,
  formFieldSchema,
  type FormConfigInput,
  type FormConfigOutput,
} from "./lib/formSchema";
export type * from "./types/form.types";
