import styles from './SubredditSidebar.module.css';
import { useEffect, useRef, useState } from 'react';
import AddSubredditForm from '../AddSubredditForm/AddSubredditForm';
import FavoritePosts from '../FavoritePosts/FavoritePosts';
import Button from '../Button/Button';
import useSwipe from '../../customHooks/useSwipe';

export default function SubredditSidebar() {
  const [showForm, setShowForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const sidebar = useRef(null);

  const { swipeHorizontal, touched } = useSwipe(sidebar);

  function handleAddSubreddit() {
    setShowFavorites(false);
    setShowForm((prevState) => !prevState);
  }
  function handleShowFavorite() {
    setShowForm(false);
    setShowFavorites((prevState) => !prevState);
  }

  function handleCloseSidebar() {
    setShowForm(false);
    setShowFavorites(false);
  }

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        handleCloseSidebar();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const sidebarElement = sidebar.current;
    if (swipeHorizontal > 0) {
      sidebarElement.style.left = `${swipeHorizontal}px`;
    }

    if (swipeHorizontal > 150) {
      handleCloseSidebar();
      sidebarElement.style.left = `${0}px`;
    }
    if (swipeHorizontal < -100) {
      setShowFavorites(true);
    }

    if (!touched) {
      sidebarElement.style.left = `${0}px`;
    }
  }, [swipeHorizontal, touched]);

  return (
    <div
      className={`${styles['sidebar']} ${
        styles[`sidebar--${showForm || showFavorites ? 'visible' : 'hidden'}`]
      }`}
      ref={sidebar}
    >
      <div
        className={`${styles['sidebar__buttons']} ${
          styles[
            `sidebar__buttons--${
              showForm || showFavorites ? 'horizontal' : 'vertical'
            }`
          ]
        }`}
      >
        <Button
          onOpen={handleAddSubreddit}
          visible={showForm}
          modifier="newsub"
        />
        <Button
          onOpen={handleShowFavorite}
          visible={showFavorites}
          modifier="fav-posts"
        />
      </div>
      <div className={styles['sidebar__content']}>
        {showForm && <AddSubredditForm />}
        {showFavorites && <FavoritePosts />}
      </div>
    </div>
  );
}
