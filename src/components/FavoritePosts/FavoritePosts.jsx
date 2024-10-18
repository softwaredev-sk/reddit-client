import styles from './FavoritePosts.module.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SIDEBAR_EFFECTS } from '../../CONSTANTS/CONSTANTS';
import { replaceEntityString } from '../../utils/utils';
import { useSubredditContext } from '../../customHooks/useSubredditContext';

export default function FavoritePosts() {
  const { favoritePosts: favorites } = useSubredditContext();

  return (
    <motion.div
      initial={SIDEBAR_EFFECTS.initial}
      animate={SIDEBAR_EFFECTS.animate}
      transition={SIDEBAR_EFFECTS.transition}
      className={styles['favorites']}
      tabIndex={1}
    >
      {favorites &&
        Object.keys(favorites) &&
        Object.keys(favorites).length === 0 && (
          <p className={styles['favorites__empty']}>
            No post added to favorites yet!
          </p>
        )}

      {favorites &&
        Object.keys(favorites) &&
        Object.keys(favorites).length > 0 && (
          <>
            <h2>List of your favorite posts:</h2>
            <ol className={styles['favorites__list']} reversed>
              {Object.entries(favorites).map((fav) => (
                <li key={fav[0]}>
                  <Link to={`/post/${fav[0]}`}>
                    {replaceEntityString(fav[1])}
                  </Link>
                </li>
              ))}
            </ol>
          </>
        )}
    </motion.div>
  );
}
