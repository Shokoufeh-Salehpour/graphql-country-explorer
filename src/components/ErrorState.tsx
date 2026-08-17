type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <section className="status-card details-card error-card" role="alert">
      {message}
    </section>
  );
}
