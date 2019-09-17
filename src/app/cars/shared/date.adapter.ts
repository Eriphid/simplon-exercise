import { NativeDateAdapter } from '@angular/material';

export function stringifyDate(date: Date) {
    const doubleDigit = (value: number) => value.toString().padStart(2, '0');
    return `${doubleDigit(date.getFullYear())}-${doubleDigit(date.getMonth() + 1)}-${doubleDigit(date.getDate())}`;
}

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      return stringifyDate(date);
  }
}