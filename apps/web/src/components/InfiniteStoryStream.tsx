'use client';

import { useRef, useEffect } from 'react';
import { Article } from '@/types';
import { CinematicStoryFrame } from './CinematicStoryFrame';

interface InfiniteStoryStreamProps {
  articles: Article[];
}

export function InfiniteStoryStream({ articles }: InfiniteStoryStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || articles.length <= 1) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 15;
      const isAtTop = scrollTop <= 15;

      // User scrolls down at the very bottom -> Loop back to top
      if (e.deltaY > 20 && isAtBottom) {
        e.preventDefault();
        isScrollingRef.current = true;
        container.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
      // User scrolls up at the very top -> Loop to bottom
      else if (e.deltaY < -20 && isAtTop) {
        e.preventDefault();
        isScrollingRef.current = true;
        container.scrollTo({ top: scrollHeight, behavior: 'smooth' });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollingRef.current) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      const isAtTop = scrollTop <= 20;

      // Swiped up (scrolling down) at bottom
      if (deltaY > 40 && isAtBottom) {
        isScrollingRef.current = true;
        container.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
      // Swiped down (scrolling up) at top
      else if (deltaY < -40 && isAtTop) {
        isScrollingRef.current = true;
        container.scrollTo({ top: scrollHeight, behavior: 'smooth' });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [articles.length]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen h-dvh overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar bg-[#F8FAFC]"
    >
      {articles.map((article, idx) => (
        <CinematicStoryFrame key={article.id} article={article} index={idx} />
      ))}
    </div>
  );
}
