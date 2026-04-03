import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";
import { saveProfileAction } from "@/app/(app)/actions/profile";
import { getCurrentUser } from "@/lib/current-user";
import { profileValuesFromProfile } from "@/lib/validators/profile";

export default async function ProfileSettingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Settings
        </p>
        <h1 className="text-[28px] font-semibold leading-tight text-foreground">
          Profile settings
        </h1>
        <p className="text-base leading-6 text-muted">
          Update your goal, level, equipment, and weekly training frequency.
        </p>
      </div>

      <section className="rounded-[1.75rem] border border-border bg-surface px-6 py-8 shadow-[0_24px_60px_rgba(33,53,45,0.08)] sm:px-8">
        <ProfileForm
          action={saveProfileAction}
          initialValues={profileValuesFromProfile(currentUser.profile)}
          intent="settings"
        />
      </section>
    </div>
  );
}
