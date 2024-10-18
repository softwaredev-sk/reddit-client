import styles from './PostContent.module.css';
import { useLocation } from 'react-router-dom';
import {
  convertDateToLocaleString,
  decodePathParameter,
  isAnImage,
} from '../../utils/utils';
import SanitizedHtml from '../SanitizedHtml/SanitizedHtml';
import Flair from '../Flair/Flair';

export default function PostContent({ postDetails }) {
  const { pathname } = useLocation();
  return (
    <>
      <div className={styles['content']}>
        <a
          href={`https://www.reddit.com/${decodePathParameter(pathname).slice(
            6
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['content__title-link']}
        >
          <h1 className={styles['content__title']}>
            <SanitizedHtml html={postDetails.title} Element="span" />
          </h1>
        </a>

        <div className={styles['content__post-info']}>
          <div>
            <b className={styles['content--bold']}>Posted:</b>
            {convertDateToLocaleString(postDetails.createdUtc)}
          </div>
          <div>
            <b className={styles['content--bold']}>Author:</b>
            <a
              target="_blank"
              href={`https://www.reddit.com/user/${postDetails.author}`}
            >
              {postDetails.author}
            </a>
            {postDetails.authorFlairBgColor && (
              <Flair
                flairBgColor={postDetails.authorFlairBgColor}
                flairText={postDetails.authorFlair}
                flairType="author"
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles['content__box']}>
        {postDetails.postFlairBgColor && (
          <Flair
            flairBgColor={postDetails.postFlairBgColor}
            flairText={postDetails.postFlair}
            flairType="post"
          />
        )}
        <div className={styles['content__post']}>
          {postDetails.descriptionHtml && (
            <SanitizedHtml html={postDetails.descriptionHtml} />
          )}
          {postDetails.thumbnail && !isAnImage(postDetails.externalLink) && (
            <img
              src={postDetails.thumbnail}
              alt="post-thumbnail"
              className={styles['content__thumbnail']}
            />
          )}
        </div>
        {postDetails.externalLink &&
          postDetails.permalink &&
          new URL(postDetails.externalLink).pathname !==
            postDetails.permalink &&
          (isAnImage(postDetails.externalLink) ? (
            <div className={styles['content__image-container']}>
              <img
                className={styles['content__image-filter']}
                src={postDetails.externalLink}
                alt="Post Image Preview"
              />
              <img
                className={styles['content__image']}
                src={postDetails.externalLink}
                alt="Post Image Preview"
              />
            </div>
          ) : (
            <>
              {postDetails.externalLink.startsWith(
                'https://www.reddit.com/gallery/'
              ) ? (
                <>
                  {'Checkout Gallery Here: '}
                  <SanitizedHtml
                    href={postDetails.externalLink}
                    target="_blank"
                    Element="a"
                    html={postDetails.externalLink}
                    className={styles['content__extenal-link']}
                  />
                </>
              ) : (
                <SanitizedHtml
                  href={postDetails.externalLink}
                  target="_blank"
                  Element="a"
                  html={postDetails.externalLink}
                  className={styles['content__extenal-link']}
                />
              )}
            </>
          ))}
        <div className={styles['content__post-activity']}>
          <b className={styles['content--bold']}>Upvotes:</b>
          <span>{postDetails.ups}</span>
        </div>
      </div>
    </>
  );
}
