import styles from './ToastNotification.module.css';

export default function ToastNotification({ message }) {
  return <p className={styles['toast']}>{message}</p>;
}
