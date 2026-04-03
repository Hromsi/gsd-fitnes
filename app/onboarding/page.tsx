import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/current-user";
import { saveProfileAction } from "@/app/(app)/actions/profile";
import { ProfileForm } from "@/components/profile/profile-form";
import { PageShell } from "@/components/layout/page-shell";
import { TopNav } from "@/components/layout/top-nav";
import { profileValuesFromProfile } from "@/lib/validators/profile";

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

  const params = searchParams ? await searchParams : undefined;
  const isEditMode = currentUser.profile?.setupCompleted === true;
  const message = params?.message ??
    (isEditMode
      ? "You can update your saved profile here anytime."
      : "Account created. Let’s set up your plan.");

  return (
    <>
      <TopNav
        currentPathLabel={isEditMode ? "Profile" : "Onboarding"}
        showProfileSettingsLink={isEditMode}
      />
      <PageShell className="items-start py-10">
        <div className="w-full max-w-3xl space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              {isEditMode ? "Profile settings" : "Onboarding"}
            </p>
            <h1 className="text-[28px] font-semibold leading-tight text-foreground">
              Let’s build your workout profile.
            </h1>
            <p className="text-base leading-6 text-muted">{message}</p>
          </div>

          <section className="rounded-[1.75rem] border border-border bg-surface px-6 py-8 shadow-[0_24px_60px_rgba(33,53,45,0.08)] sm:px-8">
            <ProfileForm
              action={saveProfileAction}
              initialValues={profileValuesFromProfile(currentUser.profile)}
              intent={isEditMode ? "settings" : "onboarding"}
            />
          </section>
        </div>
      </PageShell>
    </>
  );
}
