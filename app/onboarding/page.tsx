import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/current-user";
import { PageShell } from "@/components/layout/page-shell";
import { TopNav } from "@/components/layout/top-nav";
import { EmptyState } from "@/components/ui/empty-state";

type OnboardingPageProps = {
  searchParams?: Promise<{
    message?: string;
  }>;
};

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  if (currentUser.profile?.setupCompleted) {
    redirect("/app");
  }

  const params = searchParams ? await searchParams : undefined;
  const message = params?.message ?? "Account created. Let’s set up your plan.";

  return (
    <>
      <TopNav currentPathLabel="Onboarding" />
      <PageShell className="items-start py-10">
        <div className="w-full max-w-3xl space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Onboarding
            </p>
            <h1 className="text-[28px] font-semibold leading-tight text-foreground">
              Your fitness profile starts here.
            </h1>
            <p className="text-base leading-6 text-muted">{message}</p>
          </div>

          <EmptyState
            title="Profile setup is next"
            body="Phase 2 will collect your goal, fitness level, equipment, and training frequency here."
          />
        </div>
      </PageShell>
    </>
  );
}
