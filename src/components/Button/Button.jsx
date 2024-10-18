import styles from './Button.module.css';
export default function Button({ onOpen, visible, modifier = 'fav-posts' }) {
  return (
    <button
      type="button"
      className={`${styles['sidebar__button']} ${
        styles[`sidebar__button--${modifier}`]
      }
          ${
            styles[
              `sidebar__button--${modifier}--${visible ? 'visible' : 'hidden'}`
            ]
          }`}
      onClick={onOpen}
      aria-label={`Button for ${modifier}`}
    />
  );
}
