import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styles from './OverlayWrapper.module.css';
import { useNavigate } from 'react-router-dom';
import useSwipe from '../../customHooks/useSwipe';
import useViewportWidth from '../../customHooks/useViewportWidth';

const SMALL_VIEWPORT = {
  initialEffect: { y: 100 },
  animateEffect: { y: 0 },
  exitEffect: { y: '100%' },
  class: 'small',
};
const LARGE_VIEWPORT = {
  initialEffect: { x: 100 },
  animateEffect: { x: 0 },
  exitEffect: { x: '100%' },
  class: 'large',
};

export default function OverlayWrapper({ children }) {
  const { isMobile } = useViewportWidth();

  const overlay = useRef(null);
  const navigate = useNavigate();

  const { swipeVertical, touched } = useSwipe(overlay);

  useEffect(() => {
    const overlayElement = overlay.current;
    if (overlayElement.scrollTop === 0 && swipeVertical > 0) {
      overlayElement.style.bottom = `-${swipeVertical}px`;
    }

    if (overlayElement.scrollTop === 0 && swipeVertical > 200) {
      handleCloseOverlay();
    }

    if (!touched) {
      overlayElement.style.bottom = `${0}px`;
    }

    function handleCloseOverlay() {
      navigate('/');
    }
  }, [swipeVertical, navigate, touched]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`${styles['overlay']} ${
          isMobile
            ? styles[`overlay--${SMALL_VIEWPORT.class}`]
            : styles[`overlay--${LARGE_VIEWPORT.class}`]
        }`}
        initial={
          isMobile ? SMALL_VIEWPORT.initialEffect : LARGE_VIEWPORT.initialEffect
        }
        animate={
          isMobile ? SMALL_VIEWPORT.animateEffect : LARGE_VIEWPORT.animateEffect
        }
        exit={isMobile ? SMALL_VIEWPORT.exitEffect : LARGE_VIEWPORT.exitEffect}
        ref={overlay}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
