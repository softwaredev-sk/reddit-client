import { useLocation } from 'react-router-dom';
import { useSubredditContext } from '../../customHooks/useSubredditContext';
import { checkIsPostFav } from '../../utils/utils';
import styles from './FavoritePostToggleIcon.module.css';
import { useEffect, useState } from 'react';

export default function FavoritePostToggleIcon({ title }) {
  const { toggleFavoritePost } = useSubredditContext();
  const [isFav, setIsFav] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsFav(checkIsPostFav(pathname.slice(6)));
  }, [pathname, isFav]);

  function handleToggleFavorite() {
    const post = { [pathname.slice(6)]: title };
    const isFav = toggleFavoritePost(post);
    setIsFav(isFav);
  }

  return (
    <div
      onClick={handleToggleFavorite}
      className={isFav ? styles['icon--fav'] : styles['icon--add-to-fav']}
    />
  );
}
