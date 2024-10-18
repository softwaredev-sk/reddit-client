import styles from './PostComment.module.css';
import Flair from '../Flair/Flair';
import SanitizedHtml from '../SanitizedHtml/SanitizedHtml';

export default function PostComment({ comment }) {
  return (
    <div className={styles['comment']}>
      <div className={styles['comment__author-info']}>
        <b>comment by:</b>
        <a
          target="_blank"
          href={`https://www.reddit.com/user/${comment.author}`}
        >
          {comment.author}
        </a>
        {comment.flair && comment.flairBgColor && (
          <Flair
            flairBgColor={comment.flairBgColor}
            flairText={comment.flair}
            flairType="author"
          />
        )}
      </div>
      {comment?.body && (
        <div className={styles['comment__description']}>
          <SanitizedHtml
            html={comment.body}
            Element="a"
            href={`https://www.reddit.com/${comment.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['comment__description-link']}
          />
        </div>
      )}
      <div className={styles['comment__info']}>
        <span>
          <b>Upvotes:</b> {comment.ups}
        </span>
        {comment.replies && (
          <p>
            This comment has replies, check them{' '}
            <a
              href={`https://www.reddit.com/${comment.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              here!
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
