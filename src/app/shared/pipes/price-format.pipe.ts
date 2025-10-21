import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, currency: string = 'EUR'): string {
    if (value === null || value === undefined || isNaN(value)) {
      return 'Precio no disponible';
    }

    // Formateo específico para diferentes monedas
    const formatters: Record<string, Intl.NumberFormat> = {
      'EUR': new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      'USD': new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      'GBP': new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    };

    const formatter = formatters[currency] || formatters['EUR'];
    return formatter.format(value);
  }
}
