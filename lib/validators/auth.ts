import { z } from "zod";

export const authSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(72, "Password must be 72 characters or fewer."),
});

export type AuthFormErrors = Partial<Record<keyof z.infer<typeof authSchema> | "form", string>>;

export type AuthFormState = {
  success: boolean;
  errors: AuthFormErrors;
};

export function fieldErrorMapFromZod(error: z.ZodError): AuthFormErrors {
  return error.issues.reduce<AuthFormErrors>((acc, issue) => {
    const field = issue.path[0];

    if (typeof field === "string" && !(field in acc)) {
      acc[field as keyof AuthFormErrors] = issue.message;
    }

    return acc;
  }, {});
}
