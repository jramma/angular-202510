# Prueba Técnica — Angular 17 — Catálogo (Tabla desde cero + Detalle con fixes)

## Objetivo

Construir una mini‑SPA en Angular 17 con:

- Página principal en **tabla** (desde cero).
- Pantalla de **detalle** (casi hecha) con pequeños ajustes.
- Rutas básicas y 404.

La API a consumir es pública (DummyJSON).

---

## Requisitos

- **Node LTS** (18+ recomendado).
- Angular 17 en el proyecto donde integres este `src/`.
- NPM o PNPM/Yarn.

## Estructura entregada (resumen)

```
src/
  index.html
  styles.scss
  main.ts
  app/
    app.component.ts                 // Shell mínimo con <router-outlet>
    app.routes.ts                    // INCOMPLETO -> el candidato lo termina
    shared/
      not-found.page.ts              // 404 básica
    core/
      services/
        products.service.ts          // Esqueleto con TODOs (list/detail + mapping)
    features/
      products/
        models/
          product.model.ts           // Modelo local
        pages/
          products-table.page.ts     // VACÍO (HTML/SCSS/TS a crear)
          products-table.page.html   // VACÍO
          products-table.page.scss   // VACÍO
          product-detail.page.ts     // Semi-hecho, con TODOs
          product-detail.page.html   // Semi-hecho, con TODOs
          product-detail.page.scss   // Con un bug de clase intencional
```

---

## API pública (DummyJSON)

- **Listado**: `GET https://dummyjson.com/products?limit=<n>&skip=<n>`
- **Búsqueda**: `GET https://dummyjson.com/products/search?q=<texto>&limit=<n>&skip=<n>`
- **Detalle**: `GET https://dummyjson.com/products/<id>`
- **Modelo local `Product`**:

  ```ts
  interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    thumbnailUrl: string;
    description: string;
  }
  ```

---

## Tareas del candidato

### 1) Tabla desde cero (`products-table.page.*`)

- Crear **componente standalone** (TS/HTML/SCSS).
- Mostrar columnas: **ID, Nombre, Categoría, Precio, Rating**.
- Filas clicables → navegación a **/products/:id**.
- Búsqueda opcional (por nombre/categoría).
- **Paginación** correcta contra la API usando `limit/skip` (**Anterior** / **Siguiente**).
- Se valora que uses componentes de UI (p. ej., Angular Material para `mat-table`, inputs, botones, iconos), pero **no** imponemos cómo instalarlo.

### 2) Rutas (`app.routes.ts`)

Completar:

- `''` → **redirect** a `products`.
- `'products'` → **tabla**.
- `'products/:id'` → **detalle**.
- `**` → **NotFoundPage** (404).

### 3) Servicio (`products.service.ts`)

- Implementar:
  - `list({ q?, page?, pageSize? })` → llamada real con `limit/skip`.
  - `detail(id)` → llamada real.
- Adaptar el DTO remoto al modelo `Product` (p. ej., `title → name`, `thumbnail → thumbnailUrl`).

### 4) Detalle (ficheros `product-detail.page.*`)

- Corregir **alt** y `loading="lazy"` en la imagen.
- Dar **focus** al título al cargar (accesibilidad).
- Mostrar **precio** con `currency`.
- Añadir **botón “Reintentar”** si hay error.
- Arreglar un **bug de SCSS** intencional (clase mal escrita).

---

## Criterios de aceptación

- La **tabla** lista datos reales desde la API y **pagina** correctamente.
- Cada **fila** navega a un **detalle funcional**.
- El **detalle** corrige los TODOs, muestra contenido y maneja errores.
- Las **rutas** funcionan (redirect `/`, `/products`, `/products/:id`, 404).
- Código claro, tipado correcto y buen uso de Angular 17 (standalone, señales si las empleas, etc.).

---

## Cómo ejecutar (una vez integrado)

```bash
npm install
npm start
# abrir http://localhost:4200/
```

- Ruta de lista: `http://localhost:4200/products`
- Ruta de detalle: `http://localhost:4200/products/1` (por ejemplo)

---

## Entregables recomendados

- Código fuente (tu repo o ZIP).
- Notas/breve README explicando:
  - Decisiones de arquitectura/estado.
  - Mejores prácticas aplicadas.
  - Posibles mejoras/extra (accesibilidad, testing, loading states, etc.).
# angular-202510
