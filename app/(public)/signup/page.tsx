import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { signupAction } from "@/app/(public)/actions/auth";

export default function SignupPage() {
  return (
    <AuthCard
      eyebrow="Start your plan"
      title="Create account"
      description="Create your account and move straight into workout setup."
      footer={
        <p>
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-foreground">
            Log in
          </a>
        </p>
      }
    >
      <AuthForm
        action={signupAction}
        submitLabel="Create account"
        pendingLabel="Creating account..."
      />
    </AuthCard>
  );
}
