# 💎 La Tienda Diamante de Paula

Web de tienda online ficticia para que Paula aprenda a gestionar productos y servicios. Los familiares y amigos pueden entrar, navegar la tienda, añadir productos al carrito y reservar servicios con fecha.

## Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** SQLite (via better-sqlite3 + Drizzle ORM)
- **Despliegue:** Servidor arquityduck

## Requisitos

- Node.js 18+
- npm

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Inicializar la base de datos con datos de ejemplo
npx tsx scripts/seed.ts

# 3. Ejecutar en modo desarrollo
npm run dev
```

La tienda estará disponible en `http://localhost:3000`

## URLs

| URL | Descripción |
|-----|-------------|
| `/` | Tienda pública (home) |
| `/productos` | Listado de productos |
| `/productos/[id]` | Detalle de producto |
| `/servicios` | Listado de servicios |
| `/servicios/[id]` | Detalle de servicio |
| `/carrito` | Carrito de compras |
| `/confirmacion` | Confirmación de pedido |
| `/admin/login` | Login del admin |
| `/admin` | Dashboard admin |
| `/admin/productos` | Gestión de productos |
| `/admin/servicios` | Gestión de servicios |
| `/admin/encargos` | Gestión de encargos |

## Admin

- **Contraseña:** `20112017`
- Acceder a `/admin` → introducir contraseña
- CRUD de productos y servicios
- Gestión de encargos con estados (Pendiente → En proceso → Completado)
- Subida de imágenes

## Producción

```bash
# Build
npm run build

# Start
npm start
```

### Variables de entorno (.env.local)

```env
DATABASE_PATH=data/tienda.db
ADMIN_PASSWORD_HASH=$2b$10$...  # Hash bcrypt de la contraseña
COOKIE_SECRET=...               # Secreto para firmar cookies
NEXT_PUBLIC_SITE_URL=https://tienda-diamante.arquityduck.com
```

### Deploy con PM2

```bash
pm2 start ecosystem.config.js
```

## Funcionalidades

### Tienda pública
- Categorías de productos (Pulseras, Pegatinas, Plastilina, Maquillaje)
- Categorías de servicios (Masajes, Peluquería)
- Carrito con persistencia en cookie
- Reserva de servicios con fecha
- Confirmación con solo nombre

### Panel admin
- CRUD completo de productos y servicios
- Gestión de encargos con estados
- Subida de imágenes
- Panel resumen con estadísticas

## Licencia

Proyecto privado / educativo.
