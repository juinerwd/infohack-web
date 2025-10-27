import { defineCollection, z } from 'astro:content';

// Esquema para guías de usuario (protege tus datos)
const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(['principiante', 'intermedio', 'avanzado']).optional(),
    category: z.enum(['proteccion', 'navegacion', 'privacidad', 'general']),
    estimatedTime: z.string().optional(), // ej: "15 minutos"
    tags: z.array(z.string()),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    featured: z.boolean().default(false),
    ethicalDisclaimer: z.boolean().default(true),
    prerequisites: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    labEnvironment: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

// Esquema para tutoriales técnicos (aprende ciberseguridad)
const tutorialsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(['principiante', 'intermedio', 'avanzado']),
    category: z.enum(['web', 'network', 'system', 'malware', 'forensics', 'pentest', 'general']),
    estimatedTime: z.string().optional(), // ej: "30 minutos"
    tags: z.array(z.string()),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    prerequisites: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    ethicalDisclaimer: z.boolean().default(true),
    labEnvironment: z.string().optional(), // Descripción del entorno de laboratorio
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

// Esquema para noticias de ciberseguridad
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['amenazas', 'vulnerabilidades', 'regulacion', 'industria', 'investigacion', 'eventos']),
    tags: z.array(z.string()),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    source: z.string().optional(), // Fuente original de la noticia
    sourceUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    ethicalDisclaimer: z.boolean().default(true),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

// Esquema para recursos (herramientas, cursos, canales, etc.)
const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['herramientas', 'laboratorios', 'cursos', 'certificaciones', 'documentacion', 'comunidades']),
    tags: z.array(z.string()),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    featured: z.boolean().default(false),
    ethicalDisclaimer: z.boolean().default(true),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

// Exportar colecciones
export const collections = {
  guides: guidesCollection,
  tutorials: tutorialsCollection,
  news: newsCollection,
  resources: resourcesCollection,
};
