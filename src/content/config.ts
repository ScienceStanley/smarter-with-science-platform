import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pod: z.object({
      name: z.string(),
      icon: z.string(),
    }),
    status: z.enum(['active', 'planning', 'completed', 'archived']),
    technologies: z.array(z.string()),
    contributors: z.array(z.string()),
    startDate: z.date(),
    lastUpdated: z.date(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects,
};