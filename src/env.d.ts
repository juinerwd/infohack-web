/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /**
     * Nonce único para Content Security Policy
     * Se genera en cada request para permitir scripts inline seguros
     */
    nonce?: string;
  }
}
