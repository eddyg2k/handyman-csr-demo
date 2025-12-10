import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";

export type MotionStyle = CSSProperties;

export type MotionTransition = {
  duration?: number;
  delay?: number;
  ease?: string;
};

export type MotionProps<T extends ElementType> = {
  initial?: MotionStyle;
  animate?: MotionStyle;
  whileHover?: MotionStyle;
  whileTap?: MotionStyle;
  transition?: MotionTransition;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "style">;

type MotionComponent<T extends ElementType> = ForwardRefExoticComponent<
  PropsWithoutRef<MotionProps<T>> & RefAttributes<Element>
>;

function buildTransition(transition?: MotionTransition) {
  const { duration = 0.6, delay = 0, ease = "ease" } = transition || {};
  return `${duration}s ${ease} ${delay}s`;
}

function mergeStyles(base?: CSSProperties, incoming?: MotionStyle) {
  return { ...base, ...(incoming || {}) } satisfies CSSProperties;
}

function createMotionComponent<T extends ElementType>(
  Component: T
): MotionComponent<T> {
  return forwardRef<Element, MotionProps<T>>(function MotionComponent(
    { initial, animate, whileHover, whileTap, transition, style, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, ...rest },
    ref
  ) {
    const [activeStyle, setActiveStyle] = useState<CSSProperties>(() => mergeStyles(style, initial));
    const animateStyle = useMemo(() => mergeStyles({}, animate), [animate]);
    const hoverStyle = useMemo(() => mergeStyles(animateStyle, whileHover), [animateStyle, whileHover]);
    const tapStyle = useMemo(() => mergeStyles(hoverStyle, whileTap), [hoverStyle, whileTap]);
    const hasMounted = useRef(false);

    useEffect(() => {
      if (!hasMounted.current) {
        hasMounted.current = true;
        requestAnimationFrame(() => {
          setActiveStyle((prev) => ({ ...prev, ...animateStyle, transition: buildTransition(transition) }));
        });
      } else {
        setActiveStyle((prev) => ({ ...prev, ...animateStyle, transition: buildTransition(transition) }));
      }
    }, [animateStyle, transition]);

    const handleMouseEnter = (event: React.MouseEvent<Element, MouseEvent>) => {
      setActiveStyle((prev) => ({ ...prev, ...hoverStyle }));
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<Element, MouseEvent>) => {
      setActiveStyle((prev) => ({ ...prev, ...animateStyle }));
      onMouseLeave?.(event);
    };

    const handleMouseDown = (event: React.MouseEvent<Element, MouseEvent>) => {
      setActiveStyle((prev) => ({ ...prev, ...tapStyle }));
      onMouseDown?.(event);
    };

    const handleMouseUp = (event: React.MouseEvent<Element, MouseEvent>) => {
      setActiveStyle((prev) => ({ ...prev, ...hoverStyle }));
      onMouseUp?.(event);
    };

    const mergedStyle = mergeStyles(activeStyle, style);

    return (
      <Component
        ref={ref as never}
        style={mergedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...(rest as Record<string, unknown>)}
      />
    );
  });
}

const motion = new Proxy(
  {},
  {
    get: (_target, key: string) => createMotionComponent(key as ElementType),
  }
) as {
  [K in keyof JSX.IntrinsicElements]: MotionComponent<K>;
};

export { motion };
