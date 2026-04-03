import { EmptyState } from "@/components/ui/empty-state";

export default function AppHomePage() {
  return (
    <EmptyState
      title="No account session yet"
      body="Create an account or log in to start your workout setup."
    />
  );
}
