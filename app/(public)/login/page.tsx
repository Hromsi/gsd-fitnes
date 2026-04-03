import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { loginAction } from "@/app/(public)/actions/auth";

export default function LoginPage() {
  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Log in"
      description="Pick up where you left off and continue your workout setup."
      footer={
        <p>
          Need an account?{" "}
          <a href="/signup" className="font-semibold text-foreground">
            Create account
          </a>
        </p>
      }
    >
      <AuthForm
        action={loginAction}
        submitLabel="Log in"
        pendingLabel="Logging in..."
      />
    </AuthCard>
  );
}
