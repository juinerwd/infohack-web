/**
 * Sistema de Rate Limiting para prevenir abuso
 * Implementa límite de peticiones por IP/usuario en ventana de tiempo
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;
  
  constructor(
    private maxRequests: number = 10,
    private timeWindow: number = 60000, // 1 minuto en ms
    private cleanupFrequency: number = 300000 // Limpiar cada 5 minutos
  ) {
    // Iniciar limpieza automática de entradas antiguas
    this.startCleanup();
  }
  
  /**
   * Verifica si una petición está permitida
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(identifier);
    
    // Si no hay entrada o el tiempo se reseteo
    if (!entry || now >= entry.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.timeWindow
      });
      return true;
    }
    
    // Si ya alcanzó el límite
    if (entry.count >= this.maxRequests) {
      return false;
    }
    
    // Incrementar contador
    entry.count++;
    this.requests.set(identifier, entry);
    return true;
  }
  
  /**
   * Obtiene el tiempo restante para reset (en segundos)
   */
  getTimeUntilReset(identifier: string): number {
    const entry = this.requests.get(identifier);
    if (!entry) return 0;
    
    const now = Date.now();
    const timeLeft = Math.max(0, entry.resetTime - now);
    return Math.ceil(timeLeft / 1000);
  }
  
  /**
   * Obtiene cuántas peticiones quedan disponibles
   */
  getRemainingRequests(identifier: string): number {
    const entry = this.requests.get(identifier);
    if (!entry) return this.maxRequests;
    
    const now = Date.now();
    if (now >= entry.resetTime) return this.maxRequests;
    
    return Math.max(0, this.maxRequests - entry.count);
  }
  
  /**
   * Resetea el rate limit para un identificador específico
   */
  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
  
  /**
   * Limpia entradas antiguas del mapa
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [identifier, entry] of this.requests.entries()) {
      if (now >= entry.resetTime) {
        this.requests.delete(identifier);
      }
    }
  }
  
  /**
   * Inicia limpieza automática periódica
   */
  private startCleanup(): void {
    if (this.cleanupInterval) return;
    
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.cleanupFrequency);
  }
  
  /**
   * Detiene la limpieza automática
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
  
  /**
   * Obtiene estadísticas del rate limiter
   */
  getStats(): { totalEntries: number; activeBlocks: number } {
    const now = Date.now();
    let activeBlocks = 0;
    
    for (const entry of this.requests.values()) {
      if (entry.count >= this.maxRequests && now < entry.resetTime) {
        activeBlocks++;
      }
    }
    
    return {
      totalEntries: this.requests.size,
      activeBlocks
    };
  }
}

// Instancias predefinidas para diferentes casos de uso
export const apiRateLimiter = new RateLimiter(20, 60000); // 20 req/min para API
export const formRateLimiter = new RateLimiter(5, 60000); // 5 req/min para formularios
export const authRateLimiter = new RateLimiter(5, 300000); // 5 req/5min para auth

// Exportar la clase para instancias personalizadas
export default RateLimiter;

/**
 * Helper para obtener identificador de cliente
 */
export function getClientIdentifier(request: Request): string {
  // Intenta obtener IP real detrás de proxies
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  return forwardedFor?.split(',')[0].trim() || 
         realIp || 
         cfConnectingIp || 
         'unknown';
}
