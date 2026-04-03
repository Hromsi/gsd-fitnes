import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/current-user";
import { PageShell } from "@/components/layout/page-shell";
import { TopNav } from "@/components/layout/top-nav";

export default async function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  if (!currentUser.profile?.setupCompleted) {
    redirect("/onboarding");
  }

  return (
    <>
      <TopNav currentPathLabel="App" />
      <PageShell className="items-start py-10">{children}</PageShell>
    </>
  );
}
