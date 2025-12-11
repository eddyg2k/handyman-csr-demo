"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type LazyMapProps = {
  src: string;
  title: string;
  wrapperClassName?: string;
  frameClassName?: string;
  fallback?: ReactNode;
};

export function LazyMap({ src, title, wrapperClassName, frameClassName, fallback }: LazyMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: "160px", threshold: 0.1 }
      );

      observer.observe(target);
      return () => observer.disconnect();
    }

    setVisible(true);
  }, []);

  return (
    <div ref={containerRef} className={wrapperClassName} aria-label={title}>
      {visible ? (
        <iframe title={title} src={src} className={frameClassName ?? "h-full w-full"} loading="lazy" />
      ) : (
        fallback ?? <div className={`h-full w-full animate-pulse bg-slate-800/80`} />
      )}
    </div>
  );
}
