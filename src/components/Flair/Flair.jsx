import styles from './Flair.module.css';
import { blackOrWhiteTextColor } from '../../utils/utils';

export default function Flair({ flairText, flairBgColor, flairType }) {
  return (
    <span
      className={`${styles['flair']} ${styles[`flair--${flairType}`]}`}
      style={{
        backgroundColor: flairBgColor,
        color: blackOrWhiteTextColor(flairBgColor),
      }}
    >
      {flairText}
    </span>
  );
}
