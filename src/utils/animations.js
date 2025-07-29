/*
  Framer Motion animation variants and helper functions
  File: utils/animations.js
*/

// Container variant to stagger child animations
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0,
    },
  },
};

// Fade in from bottom
export const fadeInUp = (delay = 0, duration = 0.6) => ({
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      delay,
      duration,
    },
  },
});

// Fade in from left
export const fadeInLeft = (delay = 0, duration = 0.6) => ({
  hidden: { x: -40, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      delay,
      duration,
    },
  },
});

// Fade in from right
export const fadeInRight = (delay = 0, duration = 0.6) => ({
  hidden: { x: 40, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      delay,
      duration,
    },
  },
});

// Scale in with fade
export const scaleIn = (delay = 0, duration = 0.6) => ({
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay,
      duration,
    },
  },
});
