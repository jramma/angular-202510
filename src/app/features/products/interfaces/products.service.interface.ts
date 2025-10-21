import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductsListOptions {
  q?: string;
  page?: number;
  pageSize?: number;
}

export interface IProductsService {
  list(opts: ProductsListOptions): Observable<Paged<Product>>;
  detail(id: number): Observable<Product>;
}
