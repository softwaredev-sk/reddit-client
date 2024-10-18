import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import ThemeToggle from '../themeToggle/ThemeToggle';
import useViewportWidth from '../../customHooks/useViewportWidth';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useSwipe from '../../customHooks/useSwipe';

const MOBILE_WIDTH = 480;

function NavigationLinks({ isMobile, onClose }) {
  const swiper = useRef(null);
  const { swipeHorizontal, touched } = useSwipe(swiper);

  useEffect(() => {
    const swiperElement = swiper.current;

    if (swipeHorizontal > 0) {
      swiperElement.style.translate = `${swipeHorizontal}px`;
    }
    if (swipeHorizontal > 75) {
      onClose();
    }

    if (!touched) {
      swiperElement.style.translate = `0`;
    }
  }, [swipeHorizontal, touched, onClose]);

  return (
    <motion.ul
      className={`${styles['links']} ${
        styles[`links--${isMobile ? 'mobile' : 'desktop'}`]
      }`}
      initial={{ x: isMobile ? '100%' : 0 }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      ref={swiper}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <a target="_blank" href="https://www.github.com/softwaredev-sk">
          GitHub
        </a>
      </li>
      <li>
        <a target="_blank" href="https://www.shailendra.xyz">
          SK
        </a>
      </li>
      <li>
        <a target="_blank" href="https://www.linkedin.com/in/shailendrakrsk">
          Linkedin
        </a>
      </li>
    </motion.ul>
  );
}

export default function Header() {
  const { isMobile } = useViewportWidth(MOBILE_WIDTH);
  const [showNavigationLinks, setShowNavigationLinks] = useState(false);

  function handleMobileNavigation() {
    setShowNavigationLinks((prevState) => !prevState);
  }

  return (
    <nav className={styles['header']}>
      <Link to="/" className={styles['logo']}>
        <img
          src="https://www.redditstatic.com/shreddit/assets/favicon/128x128.png"
          alt="Reddit Logo"
        />
      </Link>
      <div className={styles['navigation--right']}>
        <ThemeToggle />
        {isMobile ? (
          <div className={styles['links__mobile-menu']}>
            <button
              type="button"
              className={`${styles['links__hamburger']} ${
                showNavigationLinks ? styles['links__hamburger--open'] : ''
              }`}
              aria-label="Open Navigation Links"
              onClick={handleMobileNavigation}
            >
              <span className={styles['links__hamburger-overlay']}></span>
            </button>
            <AnimatePresence mode="wait">
              {showNavigationLinks && (
                <NavigationLinks
                  isMobile={isMobile}
                  onClose={handleMobileNavigation}
                />
              )}
            </AnimatePresence>
          </div>
        ) : (
          <NavigationLinks isMobile={isMobile} />
        )}
      </div>
    </nav>
  );
}
