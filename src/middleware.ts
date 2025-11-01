import type { MiddlewareHandler } from 'astro';
import { formRateLimiter, getClientIdentifier } from './utils/rate-limiter';

/**
 * Genera un nonce único para CSP
 */
function generateNonce(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para ambientes sin crypto
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Construye una Content Security Policy más segura
 */
function buildCSP(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`, // Usar nonce en lugar de unsafe-inline
    "style-src 'self' 'unsafe-inline'", // Estilos inline permitidos (TailwindCSS)
    "img-src 'self' data: https:", // Imágenes de origen propio, data URLs y HTTPS
    "font-src 'self' data:", // Fuentes locales y data URLs
    "connect-src 'self'", // Solo conexiones al mismo origen
    "media-src 'self'", // Solo media del mismo origen
    "object-src 'none'", // No permitir plugins
    "child-src 'none'", // No permitir frames
    "worker-src 'self'", // Service workers solo del mismo origen
    "frame-ancestors 'none'", // Prevenir clickjacking
    "form-action 'self'", // Formularios solo al mismo origen
    "base-uri 'self'", // Base URL restringida
    "manifest-src 'self'", // Manifest solo del mismo origen
    "upgrade-insecure-requests" // Forzar HTTPS
  ].join("; ");
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request, url } = context;
  
  // Rate Limiting para rutas específicas
  if (url.pathname.startsWith('/api/') || 
      url.pathname.includes('/contact') ||
      url.pathname.includes('/subscribe')) {
    
    const clientId = getClientIdentifier(request);
    
    if (!formRateLimiter.isAllowed(clientId)) {
      const retryAfter = formRateLimiter.getTimeUntilReset(clientId);
      
      return new Response(
        JSON.stringify({ 
          error: 'Demasiadas peticiones. Por favor, espera un momento.',
          retryAfter 
        }), 
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': retryAfter.toString()
          }
        }
      );
    }
  }
  
  // Generar nonce para CSP
  const nonce = generateNonce();
  
  // Almacenar nonce en locals para usar en componentes
  context.locals.nonce = nonce;
  
  // Procesar la respuesta
  const response = await next();
  
  // Solo agregar cabeceras de seguridad para páginas HTML
  if (response.headers.get('content-type')?.includes('text/html')) {
    // Crear nueva respuesta con cabeceras de seguridad
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
    
    // Headers de seguridad estándar
    newResponse.headers.set('X-Frame-Options', 'DENY');
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('X-XSS-Protection', '1; mode=block');
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    
    // Strict Transport Security (HSTS)
    newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Content Security Policy mejorada con nonce
    newResponse.headers.set('Content-Security-Policy', buildCSP(nonce));
    
    // Header adicional para privacidad
    newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    newResponse.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    
    return newResponse;
  }
  
  return response;
};
