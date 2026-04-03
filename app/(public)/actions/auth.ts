"use server";

import { AuthError } from "next-auth";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import {
  authSchema,
  type AuthFormErrors,
  type AuthFormState,
  fieldErrorMapFromZod,
} from "@/lib/validators/auth";

function getFormValue(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

function buildCredentials(formData: FormData) {
  return {
    email: getFormValue(formData, "email"),
    password: getFormValue(formData, "password"),
  };
}

function validationErrorState(errors: AuthFormErrors): AuthFormState {
  return {
    success: false,
    errors,
  };
}

export async function signupAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = authSchema.safeParse(buildCredentials(formData));

  if (!parsed.success) {
    return validationErrorState(fieldErrorMapFromZod(parsed.error));
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.email.toLowerCase(),
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return {
      success: false,
      errors: {
        email: "An account with this email already exists.",
      },
    };
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      passwordHash,
      profile: {
        create: {
          setupCompleted: false,
        },
      },
    },
  });

  await signIn("credentials", {
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
    redirect: false,
  });

  redirect("/onboarding?message=Account+created.+Let%27s+set+up+your+plan.");
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = authSchema.safeParse(buildCredentials(formData));

  if (!parsed.success) {
    return validationErrorState(fieldErrorMapFromZod(parsed.error));
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        errors: {
          form: "We couldn’t sign you in. Check your email and password and try again.",
        },
      };
    }

    throw error;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsed.data.email.toLowerCase(),
    },
    select: {
      profile: {
        select: {
          setupCompleted: true,
        },
      },
    },
  });

  redirect(user?.profile?.setupCompleted ? "/app" : "/onboarding");
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/login",
  });
}
