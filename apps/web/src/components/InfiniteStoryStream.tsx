'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Article } from '@/types';
import { CinematicStoryFrame } from './CinematicStoryFrame';

interface InfiniteStoryStreamProps {
  articles: Article[];
}

export function InfiniteStoryStream({ articles }: InfiniteStoryStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  // Replicate array to create a continuous infinite loop (e.g. 5 sets)
  const repeatCount = articles.length > 0 ? 5 : 1;
  const loopedArticles = useMemo(() => {
    if (articles.length === 0) return [];
    let list: { article: Article; uniqueKey: string; originalIndex: number }[] = [];
    for (let r = 0; r < repeatCount; r++) {
      articles.forEach((art, idx) => {
        list.push({
          article: art,
          uniqueKey: `${art.id}-rep-${r}-${idx}`,
          originalIndex: idx,
        });
      });
    }
    return list;
  }, [articles, repeatCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || articles.length <= 1) return;

    // Start in the middle set (set index 2 out of 0..4)
    const singleSetHeight = container.clientHeight * articles.length;
    container.scrollTop = singleSetHeight * 2;

    const handleScroll = () => {
      if (isResettingRef.current) return;

      const currentScroll = container.scrollTop;
      const totalHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // If user scrolls too close to bottom (reached 4th set), seamlessly jump back to 2nd set
      if (currentScroll >= singleSetHeight * 3.5) {
        isResettingRef.current = true;
        container.style.scrollBehavior = 'auto';
        container.scrollTop = currentScroll - singleSetHeight * 2;
        container.style.scrollBehavior = 'smooth';
        requestAnimationFrame(() => {
          isResettingRef.current = false;
        });
      }
      // If user scrolls too close to top (reached 1st set), seamlessly jump forward to 2nd set
      else if (currentScroll <= singleSetHeight * 0.5) {
        isResettingRef.current = true;
        container.style.scrollBehavior = 'auto';
        container.scrollTop = currentScroll + singleSetHeight * 2;
        container.style.scrollBehavior = 'smooth';
        requestAnimationFrame(() => {
          isResettingRef.current = false;
        });
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [articles.length]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen h-dvh overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar bg-[#F8FAFC]"
    >
      {loopedArticles.map((item) => (
        <CinematicStoryFrame
          key={item.uniqueKey}
          article={item.article}
          index={item.originalIndex}
        />
      ))}
    </div>
  );
}
