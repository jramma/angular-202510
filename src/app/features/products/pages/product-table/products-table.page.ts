import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { Paged } from '../../interfaces/products.service.interface';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './products-table.page.html',
  styleUrls: ['./products-table.page.scss'],
})
export class ProductsTablePage implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'rating'];
  dataSource: Product[] = [];

  loading = signal(false);
  error = signal<string | null>(null);
  searchQuery = signal('');

  // Paginación
  totalItems = signal(0);
  pageSize = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 50];

  // Búsqueda
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.loadProducts();

    // Configurar búsqueda con debounce
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.searchQuery.set(query);
        this.currentPage = 1;
        this.loadProducts();
      });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onRowClick(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    this.productsService
      .list({
        q: this.searchQuery() || undefined,
        page: this.currentPage,
        pageSize: this.pageSize,
      })
      .subscribe({
        next: (response: Paged<Product>) => {
          this.dataSource = response.items;
          this.totalItems.set(response.total);
          this.loading.set(false);
        },
        error: (err: any) => {
          this.error.set('Error al cargar los productos');
          this.loading.set(false);
          console.error('Error loading products:', err);
        },
      });
  }
}
/** TODO: crear componente standalone y construir tabla con Angular Material */
