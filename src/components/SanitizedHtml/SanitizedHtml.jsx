import styles from './SanitizedHtml.module.css';

export default function SanitizedHtml({ html, Element = 'div', ...props }) {
  html = html
    .replaceAll(/\n+/g, '\n')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('<a', '<a target="_blank" ')
    .replaceAll('href="/', 'href="https://www.reddit.com/');

  return (
    <Element
      className={styles['sanitized-html']}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}
