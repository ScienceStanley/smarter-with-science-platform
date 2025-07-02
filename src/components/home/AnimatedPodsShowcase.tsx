/**
 * AnimatedPodsShowcase.tsx
 * Enhanced pods showcase with Framer Motion animations and Lucide icons
 * 
 * Features:
 * - Smooth scroll-triggered animations
 * - Professional hover effects
 * - Modern icon integration
 * - Staggered card reveals
 */

import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { 
  Waves, 
  Brain, 
  Atom, 
  Users, 
  ArrowRight,
  Globe
} from 'lucide-react';

interface Pod {
  id: string;
  name: string;
  icon: string;
  iconComponent: React.ComponentType<any>;
  pixelArt: string;
  description: string;
  stats: string;
  color: 'primary' | 'success';
  href: string;
}

const pods: Pod[] = [
  {
    id: 'ocean-vision',
    name: 'Ocean ViSION',
    icon: '🌊',
    iconComponent: Waves,
    pixelArt: '/images/pod-ocean-vision-pixel.svg',
    description: 'AI-powered marine conservation combining computer vision with community science to protect our oceans.',
    stats: '12 active projects',
    color: 'primary',
    href: '/pods/ocean-vision'
  },
  {
    id: 'ai-impact',
    name: 'AI Impact Ventures',
    icon: '🚀',
    iconComponent: Brain,
    pixelArt: '/images/pod-ai-impact-pixel.svg',
    description: 'Ethical AI development for social good, ensuring technology serves humanity\'s greatest challenges.',
    stats: '8 active projects',
    color: 'success',
    href: '/pods/ai-impact'
  },
  {
    id: 'quantum-bio',
    name: 'Quantum Biology',
    icon: '⚛️',
    iconComponent: Atom,
    pixelArt: '/images/pod-quantum-bio-pixel.svg',
    description: 'Exploring quantum effects in biological systems to unlock new frontiers in medicine and biotechnology.',
    stats: '6 active projects',
    color: 'primary',
    href: '/pods/quantum-bio'
  },
  {
    id: 'community-resilience',
    name: 'Community Resilience',
    icon: '🏘️',
    iconComponent: Users,
    pixelArt: '/images/pod-community-resilience-pixel.svg',
    description: 'Local solutions to global challenges, empowering communities with science and technology.',
    stats: '15 active projects',
    color: 'success',
    href: '/pods/community-resilience'
  }
];

const AnimatedPodsShowcase: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const imageVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants: Variants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
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
    }
  };

  return (
    <section className="section-padding-lg relative">
      <div className="container mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-2xl"
        >
          <motion.h2
            variants={headerVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-light text-text-bright mb-md"
          >
            Research Pods
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-lg text-text max-w-3xl mx-auto"
          >
            Autonomous working groups tackling humanity's greatest challenges through 
            open collaboration and community-driven research.
          </motion.p>
        </motion.div>

        {/* Pods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-xl max-w-5xl mx-auto"
        >
          {pods.map((pod, index) => {
            const IconComponent = pod.iconComponent;
            const isSuccess = pod.color === 'success';
            
            return (
              <motion.a
                key={pod.id}
                href={pod.href}
                variants={cardVariants}
                whileHover="hover"
                className="group relative block"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Card content */}
                <div className="relative bg-surface/50 border border-border rounded-lg overflow-hidden group-hover:border-primary/50 transition-all duration-300">
                  {/* Pixel art hero image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={pod.pixelArt}
                      alt={`${pod.name} pixel art`}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: 'pixelated' }}
                      variants={imageVariants}
                      whileHover="hover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent" />
                    
                    {/* Enhanced icon badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className={`hexagon flex items-center justify-center transition-all duration-200 ease-out w-12 h-12 ${
                          isSuccess ? 'bg-success' : 'bg-primary'
                        }`}
                        variants={iconVariants}
                        whileHover="hover"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                      >
                        <IconComponent 
                          size={20} 
                          className={`${isSuccess ? 'text-background' : 'text-background'}`}
                        />
                      </motion.div>
                    </div>

                    {/* Stats badge */}
                    <motion.div
                      className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-xs font-medium text-success">{pod.stats}</span>
                    </motion.div>
                  </div>
                  
                  {/* Content section */}
                  <div className="p-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-space-grotesk font-medium text-text-bright mb-sm group-hover:text-primary transition-colors duration-300">
                          {pod.name}
                        </h3>
                        <p className="text-text text-sm leading-relaxed">
                          {pod.description}
                        </p>
                      </div>
                      
                      {/* Arrow indicator with animation */}
                      <motion.div
                        variants={arrowVariants}
                        initial="hidden"
                        whileHover="visible"
                        className="ml-4 flex-shrink-0"
                      >
                        <ArrowRight 
                          size={20} 
                          className="text-primary group-hover:text-success transition-colors duration-300"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          className="text-center mt-2xl"
        >
          <motion.a
            href="/pods"
            className="inline-flex items-center justify-center font-medium rounded transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background border border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg group"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.98 }}
          >
            <Globe size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Explore All Research Pods
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedPodsShowcase;