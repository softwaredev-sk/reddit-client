import { Link } from 'react-router-dom';
import styles from './PostTitle.module.css';

import { encodePathParameter } from '../../utils/utils';
import SanitizedHtml from '../SanitizedHtml/SanitizedHtml';

export default function PostTitle({ post }) {
  function handlePreventDefault(e) {
    if (e.ctrlKey) {
      // for scrolling horizontally by ctrl + click scroll without opening link on click, applied in Home component.
      e.preventDefault();
    }
  }

  return (
    <div className={styles['posts']}>
      <div className={styles['posts__post']}>
        {post.id === 'initialPage' && (
          <>
            <img
              className={styles['posts__helper-arrow']}
              src="/helper-arrow.png"
              alt="Indicator Arrow"
            />
            <div>{post.title}</div>
          </>
        )}
        {post.id !== 'initialPage' && (
          <>
            <div className={styles['posts__post-info']}>
              <div className={styles['posts__icon--upvotes']}>^</div>
              <div className={styles['posts__upvotes']}>{post.upvotes}</div>
            </div>
            <Link
              className={styles['posts__post-title']}
              to={`/post/${encodePathParameter(post.permalink)}`}
              draggable={false}
              onClick={handlePreventDefault}
            >
              <SanitizedHtml Element="span" html={post.title} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
