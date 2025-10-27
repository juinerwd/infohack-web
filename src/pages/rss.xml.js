import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // Obtener todos los contenidos publicados
  const guides = await getCollection('guides');
  const tutorials = await getCollection('tutorials');
  const news = await getCollection('news');
  
  // Combinar y ordenar por fecha
  const allPosts = [
    ...guides.map(post => ({
      ...post,
      type: 'guide',
      url: `/guides/${post.slug}/`
    })),
    ...tutorials.map(post => ({
      ...post,
      type: 'tutorial', 
      url: `/tutorials/${post.slug}/`
    })),
    ...news.map(post => ({
      ...post,
      type: 'news',
      url: `/news/${post.slug}/`
    }))
  ].sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));

  return rss({
    title: 'Infohack - Ciberseguridad Accesible',
    description: 'Aprende ciberseguridad de forma accesible. Guías para usuarios comunes y tutoriales éticos para principiantes.',
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: post.url,
      author: post.data.author || 'Equipo Infohack',
      categories: post.data.tags || [],
      // Añadir disclaimer para tutoriales técnicos
      content: post.data.ethicalDisclaimer ? 
        `<p><strong>⚠️ Contenido educativo:</strong> Usar únicamente en sistemas propios o con autorización explícita.</p><p>${post.data.description}</p>` :
        post.data.description,
    })),
    customData: `
      <language>es-es</language>
      <managingEditor>security@infohack.dev (Equipo Infohack)</managingEditor>
      <webMaster>security@infohack.dev (Equipo Infohack)</webMaster>
      <category>Ciberseguridad</category>
      <category>Educación</category>
      <category>Tecnología</category>
      <docs>https://infohack.dev/rss/about</docs>
      <generator>Astro RSS</generator>
      <image>
        <url>https://infohack.dev/favicon.svg</url>
        <title>Infohack</title>
        <link>https://infohack.dev</link>
        <width>144</width>
        <height>144</height>
        <description>Logo de Infohack</description>
      </image>
    `,
  });
}
