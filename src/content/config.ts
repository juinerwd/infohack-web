import { defineCollection, z } from 'astro:content';

// Esquema para guías de usuario (protege tus datos)
const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['protege-tus-datos', 'seguridad-basica', 'privacidad']),
    difficulty: z.enum(['fácil', 'medio']),
    time: z.string(), // ej: "5 minutos"
    tags: z.array(z.string()),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    featured: z.boolean().default(false),
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
    category: z.enum(['web-security', 'network-security', 'malware', 'forensics', 'pentest', 'general']),
    tags: z.array(z.string()),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    estimatedTime: z.string(), // ej: "30 minutos"
    prerequisites: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Campos específicos de seguridad
    ethicalDisclaimer: z.boolean().default(true),
    labEnvironment: z.string().optional(), // Descripción del entorno de laboratorio
  }),
});

// Esquema para noticias de ciberseguridad
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['incidente', 'vulnerabilidad', 'herramienta', 'tendencia', 'legislacion']),
    severity: z.enum(['baja', 'media', 'alta', 'crítica']).optional(),
    tags: z.array(z.string()),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    source: z.string().optional(), // Fuente original de la noticia
    sourceUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
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
    type: z.enum(['curso', 'herramienta', 'canal-youtube', 'blog', 'documentacion', 'libro', 'podcast']),
    category: z.enum(['aprendizaje', 'herramientas', 'referencias', 'comunidad']),
    level: z.enum(['principiante', 'intermedio', 'avanzado', 'todos']),
    tags: z.array(z.string()),
    url: z.string().url(),
    price: z.enum(['gratis', 'freemium', 'pago']),
    language: z.enum(['español', 'inglés', 'multiidioma']),
    author: z.string().default('Equipo Infohack'),
    publishDate: z.date(),
    lastUpdate: z.date().optional(),
    featured: z.boolean().default(false),
    rating: z.number().min(1).max(5).optional(),
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
