import styles from './Post.module.css';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostComment from '../PostComment/PostComment';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';
import { decodePathParameter } from '../../utils/utils';
import NotFound from '../../pages/NotFound';
import PostHeader from '../PostHeader/PostHeader';
import PostContent from '../PostContent.jsx/PostContent';
import Loading from '../Loading/Loading';

export default function Post() {
  const [postDetails, setPostDetails] = useState(null);
  const [postCommentDetails, setPostCommentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    async function fetchPost(url) {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await fetch(url);

        const resData = await res.json();

        const postDetails = {
          author: resData[0].data.children[0].data.author,
          authorFlair: resData[0].data.children[0].data.author_flair_text,
          authorFlairBgColor:
            resData[0].data.children[0].data.author_flair_background_color,
          title: resData[0].data.children[0].data.title,
          description: resData[0].data.children[0].data.selftext,
          descriptionHtml: resData[0].data.children[0].data.selftext_html,
          externalLink: resData[0].data.children[0].data.url,
          permalink: resData[0].data.children[0].data.permalink,
          ups: resData[0].data.children[0].data.ups,
          subreddit: resData[0].data.children[0].data.subreddit_name_prefixed,
          postFlair: resData[0].data.children[0].data.link_flair_text,
          postFlairBgColor:
            resData[0].data.children[0].data.link_flair_background_color,
          createdUtc: resData[0].data.children[0].data.created_utc,
          totalComments: resData[0].data.children[0].data.num_comments,
          thumbnail:
            resData[0].data.children[0].data.thumbnail_height &&
            resData[0].data.children[0].data.thumbnail_width &&
            resData[0].data.children[0].data.thumbnail,
        };
        // const postCommentDetails = resData[1].data.children.map((comment) => {
        const postCommentDetails = resData[1].data.children
          .slice(0, 20)
          .map((comment) => {
            return {
              author: comment.data.author,
              body: comment.data.body,
              bodyHtml: comment.data.body_html,
              ups: comment.data.ups,
              permalink: comment.data.permalink,
              createdUtl: comment.data.created_utc,
              replies: !!comment.data.replies,
              flair: comment.data.author_flair_text,
              flairBgColor: comment.data.author_flair_background_color,
            };
          });
        setPostDetails(postDetails);
        setPostCommentDetails(postCommentDetails);
      } catch (err) {
        console.error(err);
        setPostDetails(null);
        setPostCommentDetails(null);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (pathname.startsWith('/post/')) {
      const url =
        'https://www.reddit.com' +
        decodePathParameter(pathname.slice(6)) +
        '.json';

      fetchPost(url);
    }
  }, [pathname]);

  useEffect(() => {
    if (postDetails?.title) {
      document.title = postDetails?.title;
    } else {
      document.title = 'Reddit Hot Posts';
    }

    return () => {
      document.title = 'Reddit Hot Posts';
    };
  }, [postDetails?.title]);

  return (
    <OverlayWrapper>
      <div className={styles['postpage']}>
        <PostHeader
          subreddit={postDetails?.subreddit}
          postTitle={postDetails?.title}
          minimal={isError || isLoading}
        />
        {isLoading && <Loading />}
        {!isLoading && postDetails && (
          <div className={styles['postpage__data']}>
            <PostContent postDetails={postDetails} />
            {postCommentDetails && postCommentDetails.length > 0 && (
              <div className={styles['postpage__comments']}>
                <h3 className={styles['postpage__comments__heading']}>
                  Comments {'(' + postDetails.totalComments + ')'}
                </h3>
                {postCommentDetails.map((comment) => (
                  <Fragment key={comment.permalink}>
                    <PostComment comment={comment} />
                  </Fragment>
                ))}
              </div>
            )}
            {postDetails.totalComments > 20 && (
              <>
                <hr />
                <p className={styles['postpage__more-comments']}>
                  This post has more comments, check them out{' '}
                  <a
                    target="_blank"
                    href={`https://www.reddit.com${decodePathParameter(
                      pathname.slice(6)
                    )}`}
                  >
                    here
                  </a>
                </p>
              </>
            )}
          </div>
        )}
        {((!isLoading && !postDetails && !postCommentDetails) || isError) && (
          <NotFound page="Post" overlay={false} />
        )}
      </div>
    </OverlayWrapper>
  );
}
