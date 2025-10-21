import { Component, ElementRef, ViewChild, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { PriceFormatPipe } from '../../../../shared/pipes/price-format.pipe';

// Interfaces para mejor tipado
interface LoadingState {
  loading: boolean;
  error: string | null;
  product: Product | null;
}

interface ImageErrorEvent {
  target: HTMLImageElement;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule,
    PriceFormatPipe
  ],
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss']
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private svc = inject(ProductsService);
  private snackBar = inject(MatSnackBar);

  @ViewChild('titleEl') titleEl!: ElementRef<HTMLHeadingElement>;

  // Signals con mejor tipado
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  product = signal<Product | null>(null);
  imageError = signal<boolean>(false);

  ngOnInit() {
    this.fetch();
  }

  private fetch(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(+id)) {
      this.error.set('ID de producto no válido');
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.imageError.set(false);

    this.svc.detail(+id).subscribe({
      next: (product: Product) => {
        this.product.set(product);
        this.loading.set(false);
        // Focus en el título para accesibilidad
        setTimeout(() => this.titleEl?.nativeElement?.focus(), 100);
      },
      error: (err: Error) => {
        this.error.set('No se pudo cargar el producto');
        this.loading.set(false);
        console.error('Error loading product:', err);
        this.snackBar.open('Error al cargar el producto', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  onRetry(): void {
    this.fetch();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    this.imageError.set(true);
    console.warn('Error loading product image:', img.src);

    // Mostrar imagen placeholder
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
    img.alt = 'Imagen no disponible';
  }
}
// TODO added fetch
