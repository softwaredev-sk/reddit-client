import { useContext } from 'react';
import { SubredditContext } from '../context/SubredditContext';

export function useSubredditContext() {
  const ctx = useContext(SubredditContext);
  if (!ctx) {
    throw new Error(
      'Wrap required Component inside the AppContext Provider Component'
    );
  }
  return ctx;
}
