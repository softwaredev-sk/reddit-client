import OverlayHeader from '../OverlayHeader/OverlayHeader';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';
import styles from './ErrorWrapper.module.css';

export default function ErrorWrapper({
  children,
  overlay = false,
  type = '404',
}) {
  let Element = 'div';
  let classes = `${styles['error__page']}`;
  if (overlay) {
    Element = OverlayWrapper;
  }
  if (type === 'client-error') {
    classes = `${styles['error__page']} ${styles['error__page--client']}`;
  }

  return (
    <Element className={classes}>
      {overlay && <OverlayHeader className={styles['error__button--close']} />}
      <div className={styles['error__children']}>{children}</div>
    </Element>
  );
}
