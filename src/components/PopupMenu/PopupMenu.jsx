import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PopupMenu.module.css';

export default function PopupMenu({ onSelect, onRefresh, onDelete, onRename }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const keydown = useRef(null);

  const handleShowMoreOptions = useCallback(() => {
    setShowMoreOptions((prevState) => !prevState);
    onSelect((prevState) => !prevState);
  }, [onSelect]);

  const handleRefreshButtonClick = useCallback(() => {
    onRefresh();
    handleShowMoreOptions();
  }, [handleShowMoreOptions, onRefresh]);

  const handleDeleteButtonClick = useCallback(() => {
    onDelete();
    handleShowMoreOptions();
  }, [handleShowMoreOptions, onDelete]);

  const handleRenameButtonClick = useCallback(() => {
    onRename();
    handleShowMoreOptions();
  }, [handleShowMoreOptions, onRename]);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        setShowMoreOptions(false);
        onSelect(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onSelect]);

  useEffect(() => {
    const btn = keydown.current;
    function handleKeyDown(e) {
      if (e.key.toLowerCase() === 'e') {
        handleRenameButtonClick();
      }
      if (e.key.toLowerCase() === 'r') {
        handleRefreshButtonClick();
      }
      if (e.key.toLowerCase() === 'd') {
        handleDeleteButtonClick();
      }
    }

    btn.addEventListener('keyup', handleKeyDown);
    return () => {
      btn.removeEventListener('keyup', handleKeyDown);
    };
  }, [
    handleRenameButtonClick,
    handleDeleteButtonClick,
    handleRefreshButtonClick,
  ]);

  return (
    <>
      <button
        className={styles['menu--popup']}
        onClick={handleShowMoreOptions}
        ref={keydown}
        aria-label="Subreddit Popup Menu"
      />
      {showMoreOptions && (
        <div className={styles['popup']}>
          <button onClick={handleRefreshButtonClick}>
            <span
              className={`${styles['menu__shortcut--underline']} menu__shortcut--reddit-accent`}
            >
              R
            </span>
            efresh
          </button>
          <button onClick={handleRenameButtonClick}>
            R
            <span
              className={`${styles['menu__shortcut--underline']} menu__shortcut--reddit-accent`}
            >
              e
            </span>
            name
          </button>
          <button onClick={handleDeleteButtonClick}>
            <span
              className={`${styles['menu__shortcut--underline']} menu__shortcut--reddit-accent`}
            >
              D
            </span>
            elete
          </button>
        </div>
      )}
    </>
  );
}
