import ErrorWrapper from '../components/ErrorWrapper/ErrorWrapper';

export default function ErrorPage() {
  return (
    <ErrorWrapper type="client-error">
      <div>
        <span className="error--reddit-accent">Error!</span> Something went
        wrong.
      </div>
      <p>
        Please <span className="error--reddit-accent">try again</span> after
        sometime!
      </p>
    </ErrorWrapper>
  );
}
