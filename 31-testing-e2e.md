# Capítulo 31 — Testing E2E con Playwright

## Introducción

Los tests E2E (End-to-End) simulan el comportamiento de un usuario real: abren el navegador, hacen clics, rellenan formularios y comprueban que la aplicación responde correctamente.

**Playwright** es la herramienta moderna de Microsoft que ha destronado a Cypress por su velocidad, soporte multi-navegador (Chromium, Firefox, WebKit) y su capacidad de ejecutar tests en paralelo.

## ¿Por qué Playwright?

- **Multi-navegador**: Prueba en Chrome, Firefox y Safari con el mismo código.
- **Velocidad**: Ejecuta tests en paralelo de forma nativa.
- **Auto-wait**: Espera automáticamente a que los elementos estén listos.
- **Tracing**: Graba vídeos y trazas de los fallos para depurar fácilmente.
- **Selectores accesibles**: Usa roles y textos como lo haría un usuario.

## Instalación

```bash
npm init playwright@latest