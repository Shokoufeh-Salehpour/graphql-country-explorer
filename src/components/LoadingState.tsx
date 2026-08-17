type LoadingStateProps = {
  message: string;
};

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <section className="status-card details-card" aria-busy="true" aria-live="polite">
      {message}
    </section>
  );
}
