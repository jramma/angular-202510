import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="not-found-container">
      <mat-card class="not-found-card">
        <mat-card-content>
          <div class="not-found-content">
            <mat-icon class="not-found-icon">error_outline</mat-icon>
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>La página que buscas no existe o ha sido movida.</p>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/products">
            <mat-icon>home</mat-icon>
            Volver al catálogo
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .not-found-card {
      max-width: 500px;
      text-align: center;

      .not-found-content {
        padding: 2rem;

        .not-found-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          color: #ff9800;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: 4rem;
          margin: 0;
          color: #1976d2;
        }

        h2 {
          font-size: 1.5rem;
          margin: 0.5rem 0;
          color: #333;
        }

        p {
          color: #666;
          margin: 1rem 0;
        }
      }
    }
  `]
})
export class NotFoundPage {}
