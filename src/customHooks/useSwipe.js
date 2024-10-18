import { useState, useRef, useCallback, useEffect } from 'react';

export default function useSwipe(swipeElementRef) {
  const [swipeHorizontal, setSwipeHorizontal] = useState(0);
  const [swipeVertical, setSwipeVertical] = useState(0);
  const [touched, setTouched] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setTouched(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    const distanceX = e.touches[0].clientX - touchStartX.current;
    const distanceY = e.touches[0].clientY - touchStartY.current;

    setSwipeHorizontal(distanceX);
    setSwipeVertical(distanceY);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setSwipeHorizontal(0);
    setSwipeVertical(0);
    setTouched(false);
  }, []);

  useEffect(() => {
    const swipeElement = swipeElementRef.current;

    swipeElement.addEventListener('touchstart', handleTouchStart);
    swipeElement.addEventListener('touchmove', handleTouchMove);
    swipeElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      swipeElement.removeEventListener('touchstart', handleTouchStart);
      swipeElement.removeEventListener('touchmove', handleTouchMove);
      swipeElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, swipeElementRef]);

  return {
    swipeHorizontal,
    swipeVertical,
    touched,
  };
}
