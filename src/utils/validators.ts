/**
 * Utilidades de validación y sanitización de datos
 * Para prevenir XSS, injection y otros ataques
 */

/**
 * Sanitiza input removiendo caracteres potencialmente peligrosos
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remover caracteres HTML peligrosos
    .replace(/javascript:/gi, '') // Remover javascript: URLs
    .replace(/on\w+=/gi, '') // Remover event handlers
    .slice(0, 1000); // Límite de longitud
}

/**
 * Valida formato de email
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isValidFormat = regex.test(email);
  const isValidLength = email.length >= 5 && email.length <= 254;
  
  return isValidFormat && isValidLength;
}

/**
 * Valida longitud de mensaje
 */
export function validateMessage(message: string): boolean {
  if (!message || typeof message !== 'string') return false;
  
  const trimmed = message.trim();
  return trimmed.length >= 10 && trimmed.length <= 5000;
}

/**
 * Valida nombre (solo letras, espacios y guiones)
 */
export function validateName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]{2,50}$/;
  return regex.test(name.trim());
}

/**
 * Escapa HTML para prevenir XSS
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Valida URL segura
 */
export function validateUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const parsedUrl = new URL(url);
    // Solo permitir https y http
    return ['https:', 'http:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

/**
 * Genera un token CSRF simple
 */
export function generateCsrfToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para ambientes sin crypto
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Valida token CSRF
 */
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}
