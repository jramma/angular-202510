# Catálogo de Productos - Angular App

Una aplicación de catálogo de productos desarrollada con Angular 17, que permite visualizar, buscar y navegar por productos utilizando la API de DummyJSON.

## 📁 Estructura del Proyecto

```mkd
src/app/
├── core/                           # Solo servicios/core globales
│   └── services/                   # (vacía, lista para servicios globales)
├── shared/                         # Componentes/pipes reutilizables
│   └── pipes/
│       └── price-format.pipe.ts
├── features/
│   └── products/
│       ├── components/            
│       ├── pages/                  # Páginas de productos
│       │   ├── product-detail/
│       │   └── product-table/
│       ├── services/               # ✅ Servicios específicos de productos
│       │   └── products.service.ts
│       ├── models/                 # Modelos de productos
│       │   └── product.model.ts
│       └── interfaces/             # ✅ Interfaces específicas de productos
│           └── products.service.interface.ts
└── pages/                          # ✅ Páginas globales
    └── not-found/                  # ✅ Página 404 global
        ├── not-found.page.html
        ├── not-found.page.scss
        └── not-found.page.ts
```

## Comandos

```bash
# Instalar dependencias
bun install

# Servidor de desarrollo
bun start

```

## Decisiones de Arquitectura

- **Angular Material**: Elegido por su documentación clara y componentes robustos, en lugar de Tailwind CSS para mayor velocidad de desarrollo
- **Bun**: Package manager más rápido y cómodo que npm
- **Standalone Components**: Arquitectura moderna de Angular 17
- **Signals**: Para manejo reactivo del estado local
- **Lazy Loading**: Carga diferida de componentes para optimizar rendimiento

## Mejores Prácticas Aplicadas

- **Clean Code** con comentarios descriptivos
- **Separación de responsabilidades** (servicios, modelos, componentes)
- **Manejo de errores** con estados de loading y error
- **Debounce** en búsquedas para optimizar rendimiento
- **Tipado fuerte** con TypeScript
- **Arquitectura modular** por features

## Posibles Mejoras

- **SEO**: Actualmente 80/100 en Lighthouse - se puede mejorar con meta tags y structured data
- **Testing**: Implementar tests unitarios y e2e
- **Accesibilidad**: Mejorar ARIA labels y navegación por teclado
- **Loading States**: Skeleton loaders más sofisticados
- **Caching**: Implementar estrategias de cache para la API
- **PWA**: Convertir en Progressive Web App
- **Style**: Mejorar y personalizar estilos tal vez con librería como tailwind.
