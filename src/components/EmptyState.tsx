type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <section className="status-card details-card" role="status">
      {message}
    </section>
  );
}
