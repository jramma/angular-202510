import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/products-table.page').then(m => m.ProductsTablePage)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/pages/product-detail.page').then(m => m.ProductDetailPage)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/not-found.page').then(m => m.NotFoundPage)
  }
];
