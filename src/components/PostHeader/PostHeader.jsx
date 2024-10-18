import { Link, useLocation } from 'react-router-dom';
import styles from './PostHeader.module.css';
import { decodePathParameter } from '../../utils/utils';
import FavoritePostToggleIcon from '../FavoritePostToggleIcon/FavoritePostToggleIcon';

export default function PostHeader({ subreddit, postTitle, minimal = false }) {
  const { pathname } = useLocation();
  return (
    <header className={styles['header']}>
      <Link to=".." className={styles['header__button--close']} />
      {!minimal && (
        <div className={styles['header__sub-header']}>
          {subreddit && (
            <a
              target="_blank"
              href={`https://www.reddit.com/${subreddit}`}
              rel="noopener noreferrer"
              className={styles['header__sub-link']}
            >
              {subreddit}
            </a>
          )}
          <a
            href={`https://www.reddit.com/${decodePathParameter(pathname).slice(
              6
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to post
          </a>
          <FavoritePostToggleIcon title={postTitle} />
        </div>
      )}
    </header>
  );
}
