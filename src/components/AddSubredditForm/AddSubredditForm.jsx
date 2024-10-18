import { useEffect, useRef, useState } from 'react';
import styles from './AddSubredditForm.module.css';

import { useSubredditContext } from '../../customHooks/useSubredditContext';
import { motion } from 'framer-motion';
import { ERRORS, SIDEBAR_EFFECTS } from '../../CONSTANTS/CONSTANTS';
import { isCharAllowed } from '../../utils/utils';

export default function AddSubredditForm() {
  const [redditName, setRedditName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { addSubreddit } = useSubredditContext();
  const addSubredditInput = useRef();

  function handleInput(e) {
    if (!isCharAllowed(e.target.value.at(-1))) {
      setError('Character Not Allowed');
      return;
    }
    const sub = e.target.value;
    setRedditName(sub);
    if (sub.length > 0 && sub.length < 3) {
      setError(ERRORS.short);
    }
    if (sub.length > 21) {
      setError(ERRORS.long);
    }
    if ((sub.length >= 3 && sub.length <= 21) || sub.length === 0) {
      setError(null);
    }
    setSuccess(null);
  }

  function handleAddSubreddit(e) {
    e.preventDefault();
    if (redditName === '') {
      setError(ERRORS.empty);
      setSuccess(false);
      return;
    }
    if (
      redditName.length < 3 ||
      redditName.length > 21 ||
      redditName.length === 0
    ) {
      setSuccess(false);
      return;
    }
    let subreddit = localStorage.getItem('subreddit') || '[]';
    subreddit = JSON.parse(subreddit);
    const lowerCaseSubName = subreddit.map((sub) => sub.toLowerCase());
    const indexOfNewSub = lowerCaseSubName.indexOf(redditName.toLowerCase());
    if (indexOfNewSub === -1) {
      subreddit.unshift(redditName);
      localStorage.setItem('subreddit', JSON.stringify(subreddit));

      addSubreddit(redditName);
      setError(null);
      setSuccess(true);
      setRedditName('');
    } else {
      setError(ERRORS.subExists(subreddit[indexOfNewSub]));
      setSuccess(false);
    }
  }

  useEffect(() => {
    addSubredditInput.current.focus();
  });

  return (
    <motion.form
      initial={SIDEBAR_EFFECTS.initial}
      animate={SIDEBAR_EFFECTS.animate}
      transition={SIDEBAR_EFFECTS.transition}
      className={styles['add-subreddit__form']}
      onSubmit={handleAddSubreddit}
      tabIndex={1}
    >
      <label
        htmlFor="subreddit"
        className={styles['add-subreddit__input-label']}
      >
        Enter the name of subreddit
      </label>
      <div
        className={`${styles['add-subreddit__input-container']} ${
          success !== null
            ? styles[`add-subreddit__input-container--${success}`]
            : ''
        }`}
      >
        <input
          type="text"
          placeholder="Enter sub name here..."
          id="subreddit"
          value={redditName}
          onInput={handleInput}
          className={styles[`add-subreddit__input`]}
          ref={addSubredditInput}
          autoComplete="off"
        />
      </div>

      <button type="submit" className={styles['add-subreddit__button--submit']}>
        Add Subreddit
      </button>
      {error !== null && (
        <div className={styles['add-subreddit__error']}>{error}</div>
      )}
    </motion.form>
  );
}
