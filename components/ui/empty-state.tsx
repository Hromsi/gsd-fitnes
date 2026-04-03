type EmptyStateProps = {
  title: string;
  body: string;
};

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <section className="w-full rounded-[1.5rem] border border-border bg-surface p-6">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold leading-tight text-foreground">
          {title}
        </h2>
        <p className="text-base leading-6 text-muted">{body}</p>
      </div>
    </section>
  );
}
