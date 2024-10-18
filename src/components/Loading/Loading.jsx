import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles['loading']}>
      <img src="/reddit-loading.gif" alt="loading..." />
    </div>
  );
}
