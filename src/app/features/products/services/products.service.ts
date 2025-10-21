import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import {
  IProductsService,
  Paged,
  ProductsListOptions,
} from '../interfaces/products.service.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService implements IProductsService {
  private http = inject(HttpClient);
  private base = 'https://dummyjson.com/products';

  private toProduct(dto: any): Product {
    return {
      id: dto.id,
      name: dto.title,
      category: dto.category,
      price: dto.price,
      rating: dto.rating,
      thumbnailUrl: dto.thumbnail,
      description: dto.description,
    };
  }

  list(opts: ProductsListOptions): Observable<Paged<Product>> {
    let params = new HttpParams()
      .set('limit', (opts.pageSize || 10).toString())
      .set('skip', ((opts.page || 1) - 1) * (opts.pageSize || 10));

    const url = opts.q ? `${this.base}/search` : this.base;
    if (opts.q) {
      params = params.set('q', opts.q);
    }

    return this.http.get<any>(url, { params }).pipe(
      map((response: any) => ({
        items: response.products.map((dto: any) => this.toProduct(dto)),
        total: response.total,
        page: opts.page || 1,
        pageSize: opts.pageSize || 10,
      }))
    );
  }

  detail(id: number): Observable<Product> {
    return this.http
      .get<any>(`${this.base}/${id}`)
      .pipe(map((dto) => this.toProduct(dto)));
  }
}
