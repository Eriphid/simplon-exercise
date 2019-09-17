import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datify'
})
export class DatifyPipe implements PipeTransform {

  transform(value: string): Date {
    return new Date(value);
  }

}
