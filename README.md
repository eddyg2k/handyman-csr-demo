# Handyman CSR Demo

Este repositorio contiene una aplicación demo de Next.js + Tailwind CSS para visualizar leads ficticios de un dashboard de atención al cliente.

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

## Configuración

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:3000/dashboard` en tu navegador.

## Variables de entorno

Para futuras integraciones con GHL, crea un archivo `.env.local` con las claves necesarias:

```env
GHL_API_KEY=your-ghl-api-key-here
NEXT_PUBLIC_ENV=demo
```

## Scripts disponibles

- `npm run dev`: ejecuta el modo de desarrollo.
- `npm run build`: genera el build de producción.
- `npm run start`: ejecuta el servidor en modo producción.
- `npm run lint`: ejecuta las reglas de ESLint configuradas por Next.js.

## Estructura principal

- `app/`: rutas y layout principal (App Router).
- `components/`: componentes reutilizables de React.
- `lib/`: datos mock y utilidades.
- `app/api/`: endpoints enrutados por Next.js.

## Capturas

Pendiente de agregar.
