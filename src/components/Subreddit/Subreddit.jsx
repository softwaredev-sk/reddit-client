import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './Subreddit.module.css';
import PopupMenu from '../PopUpMenu/PopupMenu';
import PostTitle from '../PostTitle/PostTitle';
import { useSubredditContext } from '../../customHooks/useSubredditContext';
import Loading from '../Loading/Loading';
import {
  filterNameWithAllowedCharacters,
  getFromLocalStorage,
  isCharAllowed,
} from '../../utils/utils';
import ToastNotification from '../ToastNotification/ToastNotification';
import useSwipe from '../../customHooks/useSwipe';
import { ERRORS } from '../../CONSTANTS/CONSTANTS';

export default function Subreddit({ subreddit }) {
  const [dimPosts, setDimPosts] = useState(false);
  const [refreshAttempt, setRefreshAttempt] = useState(0);
  const [posts, setPosts] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRenamingError, setIsRenamingError] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(subreddit);

  const editSubredditInput = useRef(null);
  const refreshSwiper = useRef(null);
  const refreshIndicator = useRef(null);

  const { removeSubreddit, updateSubredditName } = useSubredditContext();
  const { swipeHorizontal, swipeVertical, touched } = useSwipe(refreshSwiper);

  function handleRefresh() {
    setRefreshAttempt((prevState) => (prevState = prevState + 1));
  }

  function handleDelete() {
    const allSubreddit = localStorage.getItem('subreddit') || '[]';
    let subreddits = JSON.parse(allSubreddit);
    subreddits = subreddits.filter((sub) => sub !== subreddit);
    localStorage.setItem('subreddit', JSON.stringify(subreddits));
    removeSubreddit(subreddit);
  }

  function handleRename() {
    setIsRenaming(true);
  }

  function handleRenameInput(e) {
    const val = e.target.value;
    if (!isCharAllowed(val.at(-1))) {
      return;
    }
    setNewName(val);
  }

  function handleRenameComplete() {
    if (newName.length < 3 || newName.length > 21) {
      setIsRenaming(false);
      setNewName(subreddit);
      setIsRenamingError(newName.length < 3 ? ERRORS.short : ERRORS.long);
      setTimeout(() => {
        setIsRenamingError(false);
      }, 2000);
      return;
    }
    const filteredName = filterNameWithAllowedCharacters(newName);
    const subreddits = getFromLocalStorage('subreddit', '[]');
    const lowerCaseSubName = subreddits.map((sub) => sub.toLowerCase());
    const index = lowerCaseSubName.indexOf(subreddit.toLowerCase());

    // finding index of subreddit whose name to edit
    if (index !== -1) {
      //  used underscore to fill blank space to get exact index position for fetching the original subreddit name
      const newNameIndex = [
        ...lowerCaseSubName.slice(0, index),
        '_',
        ...lowerCaseSubName.slice(index + 1),
      ].indexOf(filteredName.toLowerCase());

      // finding if new name already exists
      if (newNameIndex !== -1) {
        setIsRenaming(false);
        // setIsRenamingError(ERRORS.subExists(newName));
        setIsRenamingError(ERRORS.subExists(subreddits[newNameIndex]));
        setNewName(subreddit);
        setTimeout(() => {
          setIsRenamingError(false);
        }, 2000);
        return;
      }
      subreddits[index] = filteredName;
    }
    localStorage.setItem('subreddit', JSON.stringify(subreddits));
    setIsRenaming(false);
    updateSubredditName(subreddit, filteredName, index);
  }

  function handleKeydownOnInput(e) {
    if (e.key === 'Enter') {
      handleRenameComplete();
    }
    if (e.key === 'Escape') {
      setIsRenaming(false);
      setNewName(subreddit);
    }
  }

  useEffect(() => {
    if (isRenaming && editSubredditInput.current) {
      editSubredditInput.current.focus();
      editSubredditInput.current.select();
    }
  }, [isRenaming]);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setIsError(false);
      try {
        if (refreshAttempt) {
          const response = await fetch(
            `https://www.reddit.com/r/${subreddit}/hot.json?limit=20`
          );

          const redditData = await response.json();
          const data = redditData.data.children.map((items) => ({
            id: items.data.id,
            title: items.data.title,
            author: items.data.author,
            upvotes: items.data.score,
            num_comments: items.data.num_comments,
            permalink: items.data.permalink,
            url: items.data.url,
          }));
          setPosts(data);
        }
        setIsError(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
      if (refreshAttempt === 0) {
        setPosts([
          {
            id: 'initialPage',
            title:
              'Refresh to fetch posts. Fetch set to manual loading due to Reddit API request rate limits.',
            url: '/',
            upvotes: 0,
            permalink: '/',
          },
        ]);
      }
    }
    fetchPosts();
  }, [refreshAttempt, subreddit]);

  useEffect(() => {
    if (Math.abs(swipeHorizontal) > 0 && swipeVertical < 50) {
      return;
    }

    if (swipeVertical > 0) {
      refreshIndicator.current.style.display = 'inline-block';
      refreshIndicator.current.value = swipeVertical;
    }

    if (swipeVertical > 200) {
      handleRefresh();
      refreshIndicator.current.style.display = 'none';
    }

    if (!touched) {
      refreshIndicator.current.style.display = 'none';
    }
  }, [swipeHorizontal, swipeVertical, touched]);

  // throw new Error('testing error component');

  return (
    <div className={styles['subreddit']} ref={refreshSwiper}>
      <progress
        ref={refreshIndicator}
        value={0}
        max={200}
        className={styles['subreddit__refresh-indicator']}
      />
      <header>
        <div className={styles['subreddit__name']}>
          {isRenaming ? (
            <input
              className={styles['subreddit__rename']}
              ref={editSubredditInput}
              value={newName}
              onInput={handleRenameInput}
              onKeyDown={handleKeydownOnInput}
              onBlur={handleRenameComplete}
              minLength={3}
              maxLength={21}
              type="text"
            />
          ) : (
            <a
              href={`https://www.reddit.com/r/${subreddit}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'/r/' + subreddit}
            </a>
          )}
        </div>
        <PopupMenu
          onSelect={setDimPosts}
          onRefresh={handleRefresh}
          onDelete={handleDelete}
          onRename={handleRename}
        />
      </header>
      <div
        className={`${styles['subreddit__hot-posts']} ${
          dimPosts
            ? ` ${styles['subreddit--dim']}`
            : ` ${styles['subreddit--undim']}`
        }`}
      >
        {isLoading && <Loading />}
        {isError && (
          <div className={styles['subreddit__error']}>
            {refreshAttempt > 1
              ? `Please recheck subreddit name. If the sub's name is correct, then possibly the API limit is hit for the moment. Please try again later.`
              : `Error fetching posts. Please try again later.`}
          </div>
        )}
        {!isError && !isLoading && (
          <>
            {posts.length > 0 &&
              posts.map((item) => (
                <Fragment key={item.id + item.title}>
                  <PostTitle post={item} />
                </Fragment>
              ))}
            {posts.length === 0 && (
              <p className={styles['subreddit__empty']}>So empty!</p>
            )}
          </>
        )}
      </div>
      {isRenamingError && <ToastNotification message={isRenamingError} />}
    </div>
  );
}
