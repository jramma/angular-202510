import { Routes } from '@angular/router';

/** TODO: añadir rutas /products, /products/:id, 404 y redirect */
export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/product-table/products-table.page').then(m => m.ProductsTablePage)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/pages/product-detail/product-detail.page').then(m => m.ProductDetailPage)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage)
  }
];
