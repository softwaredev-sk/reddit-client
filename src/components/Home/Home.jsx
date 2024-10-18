import { Fragment, memo, useEffect, useRef, useState } from 'react';

import Subreddit from '../Subreddit/Subreddit';

import { useSubredditContext } from '../../customHooks/useSubredditContext';

import styles from './Home.module.css';
import HomeWrapper from '../HomeWrapper/HomeWrapper';
import SubredditSidebar from '../SubredditSidebar/SubredditSidebar';

const Home = memo(function Home() {
  const { subredditList } = useSubredditContext();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    let mouseDown = false;
    setIsMouseDown(false);
    let startX, scrollLeft;
    let pointerId;
    const slider = sliderRef.current;

    const startDragging = (e) => {
      if (e.ctrlKey) {
        mouseDown = true;
        pointerId = e.pointerId;
        setIsMouseDown(true);
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.setPointerCapture(pointerId);
      }
    };

    const stopDragging = (e) => {
      if (e.ctrlKey) {
        mouseDown = false;
        setIsMouseDown(false);
        slider.releasePointerCapture(pointerId);
      }
    };

    const move = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (!mouseDown) {
          return;
        }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
      }
    };

    slider.addEventListener('pointermove', move, false);
    slider.addEventListener('pointerdown', startDragging, false);
    slider.addEventListener('pointerup', stopDragging, false);

    return () => {
      slider.removeEventListener('pointermove', move, false);
      slider.removeEventListener('pointerdown', stopDragging, false);
      slider.removeEventListener('pointerup', stopDragging, false);
    };
  }, []);

  return (
    <HomeWrapper>
      {subredditList.length > 0 && (
        <div
          className={
            isMouseDown
              ? `${styles['home']} ${styles['home--scrollable']}`
              : styles['home']
          }
          ref={sliderRef}
        >
          {subredditList.map((item) => (
            <Fragment key={item}>
              <Subreddit subreddit={item} />
            </Fragment>
          ))}
        </div>
      )}
      <SubredditSidebar />
    </HomeWrapper>
  );
});

export default Home;
