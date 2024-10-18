import ErrorWrapper from '../components/ErrorWrapper/ErrorWrapper';

export default function NotFound({ page = 'Page', overlay = true }) {
  return (
    <ErrorWrapper overlay={overlay}>
      <p>
        Error 4<span className="error--reddit-accent">0</span>4!
      </p>
      <p>{page} not found.</p>
    </ErrorWrapper>
  );
}
