/**
 * AnimatedMetricsSection.tsx
 * Enhanced metrics section with data visualizations and animations
 * 
 * Features:
 * - Interactive counting animations
 * - Mini data visualizations
 * - Scroll-triggered reveals
 * - Professional polish
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';
import { 
  Users, 
  Beaker, 
  Cpu, 
  TrendingUp,
  BarChart3,
  Activity,
  Globe
} from 'lucide-react';

interface Metric {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: 'primary' | 'success' | 'accent';
  chartData?: number[];
}

const metrics: Metric[] = [
  {
    id: 'scientists',
    value: 1234,
    suffix: '+',
    label: 'Community Scientists',
    description: 'Researchers, patients, and advocates working together',
    icon: Users,
    color: 'primary',
    chartData: [10, 25, 45, 80, 120, 200, 350, 500, 720, 950, 1234]
  },
  {
    id: 'projects',
    value: 42,
    suffix: '',
    label: 'Active Projects',
    description: 'Open research initiatives across all pods',
    icon: Beaker,
    color: 'success',
    chartData: [5, 8, 12, 18, 25, 31, 37, 42]
  },
  {
    id: 'gpu-hours',
    value: 150,
    suffix: 'K',
    label: 'GPU Hours Shared',
    description: 'Computational power democratized for research',
    icon: Cpu,
    color: 'accent',
    chartData: [10, 25, 45, 70, 95, 115, 130, 150]
  },
  {
    id: 'open-source',
    value: 89,
    suffix: '%',
    label: 'Open Source',
    description: 'Percentage of projects with public code',
    icon: Globe,
    color: 'primary',
    chartData: [45, 52, 61, 68, 74, 79, 83, 86, 89]
  }
];

const AnimatedCounter: React.FC<{ 
  value: number; 
  suffix: string; 
  duration?: number;
  isVisible: boolean;
}> = ({ value, suffix, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const startCount = 0;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startCount + (value - startCount) * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [value, duration, isVisible]);
  
  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const MiniChart: React.FC<{ 
  data: number[]; 
  color: string; 
  isVisible: boolean;
}> = ({ data, color, isVisible }) => {
  const maxValue = Math.max(...data);
  const normalizedData = data.map(value => (value / maxValue) * 100);
  
  return (
    <div className="flex items-end space-x-1 h-8 w-20 mx-auto mt-2">
      {normalizedData.map((height, index) => (
        <motion.div
          key={index}
          className={`flex-1 rounded-sm ${color}`}
          initial={{ height: 0 }}
          animate={isVisible ? { height: `${height}%` } : { height: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            ease: [0.25, 0.25, 0, 1]
          }}
        />
      ))}
    </div>
  );
};

const AnimatedMetricsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
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
      y: 40,
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

  const iconVariants: Variants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          icon: 'text-primary',
          chart: 'bg-primary'
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/30',
          icon: 'text-success',
          chart: 'bg-success'
        };
      case 'accent':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          icon: 'text-purple-400',
          chart: 'bg-purple-500'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          icon: 'text-primary',
          chart: 'bg-primary'
        };
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-success/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(189, 0, 255, 0.2), transparent, rgba(0, 255, 136, 0.2))",
              "linear-gradient(225deg, rgba(0, 255, 136, 0.2), transparent, rgba(189, 0, 255, 0.2))",
              "linear-gradient(45deg, rgba(189, 0, 255, 0.2), transparent, rgba(0, 255, 136, 0.2))"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-2xl"
        >
          <motion.div
            variants={headerVariants}
            className="inline-flex items-center space-x-3 bg-surface/80 backdrop-blur-sm border border-border rounded-full px-6 py-3 mb-6"
          >
            <Activity size={20} className="text-primary" />
            <span className="text-sm font-medium text-text">Real-Time Impact</span>
          </motion.div>
          
          <motion.h2
            variants={headerVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-light text-text-bright mb-md"
          >
            Our Collective Impact
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-lg text-text max-w-2xl mx-auto"
          >
            Real change happens when communities come together. 
            Here's what we've achieved through open collaboration.
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 lg:grid-cols-4 gap-lg max-w-6xl mx-auto"
        >
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const colors = getColorClasses(metric.color);
            
            return (
              <motion.div
                key={metric.id}
                variants={cardVariants}
                whileHover="hover"
                className={`text-center p-6 rounded-lg border ${colors.bg} ${colors.border} backdrop-blur-sm group cursor-pointer`}
              >
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className="mb-4 inline-flex items-center justify-center"
                >
                  <IconComponent size={32} className={colors.icon} />
                </motion.div>

                {/* Animated Number */}
                <div className="mb-sm">
                  <span className={`text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold ${colors.icon}`}>
                    <AnimatedCounter 
                      value={metric.value} 
                      suffix={metric.suffix}
                      isVisible={isInView}
                    />
                  </span>
                </div>

                {/* Mini Chart */}
                {metric.chartData && (
                  <MiniChart 
                    data={metric.chartData} 
                    color={colors.chart}
                    isVisible={isInView}
                  />
                )}

                {/* Label */}
                <h3 className="text-lg font-medium text-text-bright mb-xs mt-4">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-text leading-relaxed">
                  {metric.description}
                </p>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Supporting Text */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-2xl max-w-3xl mx-auto"
        >
          <p className="text-text mb-md">
            Every number represents a person, a breakthrough, or a community served. 
            Together, we're proving that science belongs to everyone.
          </p>
          <motion.a
            href="/impact"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 group"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <BarChart3 size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
            View detailed impact report
            <TrendingUp size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedMetricsSection;