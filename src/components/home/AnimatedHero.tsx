/**
 * AnimatedHero.tsx
 * Enhanced hero section with Framer Motion animations
 * 
 * Features:
 * - Smooth page load animations
 * - Staggered content reveals
 * - Interactive hover effects
 * - Professional micro-interactions
 */

import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedHeroProps {
  className?: string;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({ className }) => {
  const [dynamicText, setDynamicText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const messages = [
    "Science is too important to be left to scientists alone.",
    "Communities are too smart to be excluded from solutions.",
    "Open science accelerates discovery for everyone.",
    "Your curiosity makes you a brilliant scientist."
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8
      }
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      y: 0,
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        staggerChildren: 0.1
      }
    }
  };

  const statItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  // Dynamic typing effect
  useEffect(() => {
    const typeWriter = () => {
      const currentMessage = messages[messageIndex];
      
      if (isDeleting) {
        setDynamicText(currentMessage.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setDynamicText(currentMessage.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentMessage.length) {
        typeSpeed = 2000; // Pause at end
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setMessageIndex((messageIndex + 1) % messages.length);
        typeSpeed = 500; // Pause before next message
      }
      
      setTimeout(typeWriter, typeSpeed);
    };

    const timer = setTimeout(typeWriter, 100);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, messageIndex, messages]);

  return (
    <motion.div
      className={`container mx-auto text-center relative z-10 ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Badge */}
      <motion.div
        variants={badgeVariants}
        whileHover="hover"
        className="inline-flex items-center space-x-3 bg-surface/80 backdrop-blur-sm border border-border rounded-full px-6 py-3 mb-8 cursor-pointer"
      >
        <div className="hexagon flex items-center justify-center transition-all duration-200 ease-out w-8 h-8 bg-primary">
        </div>
        <span className="text-sm font-medium text-text">Democratizing Research Through Community</span>
      </motion.div>
      
      {/* Main Headline */}
      <motion.h1
        variants={itemVariants}
        className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold text-text-bright mb-6 leading-tight"
      >
        Science plus{' '}
        <span className="gradient-text">community</span>
        <br />
        equals exponential{' '}
        <span className="gradient-text">impact</span>
      </motion.h1>
      
      {/* Dynamic Subtitle */}
      <motion.div
        variants={itemVariants}
        className="text-lg md:text-xl text-text mb-12 max-w-3xl mx-auto"
      >
        <p className="mb-4">
          <span className="border-r-2 border-primary">
            {dynamicText}
          </span>
        </p>
        <p>
          Join researchers, patients, advocates, and communities working together 
          to make science more open, accessible, and impactful.
        </p>
      </motion.div>
      
      {/* CTA Buttons */}
      <motion.div
        variants={buttonVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.a
          href="/join"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="inline-flex items-center justify-center font-medium rounded transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background bg-primary text-background hover:bg-primary/90 px-8 py-4 text-lg w-full sm:w-auto"
        >
          Join the Movement
        </motion.a>
        <motion.a
          href="/research"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="inline-flex items-center justify-center font-medium rounded transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background border border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg w-full sm:w-auto"
        >
          Explore Research
        </motion.a>
      </motion.div>
      
      {/* Stats */}
      <motion.div
        variants={statsVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
      >
        {[
          { value: '4', label: 'Research Pods' },
          { value: '42+', label: 'Active Projects' },
          { value: '1.2K', label: 'Community Members' },
          { value: '∞', label: 'Potential Impact' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={statItemVariants}
            whileHover="hover"
            className="cursor-pointer"
          >
            <div className="text-3xl font-bold text-success">{stat.value}</div>
            <div className="text-sm text-text">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedHero;