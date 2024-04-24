import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitChar',
  standalone: true,
})
export class LimitCharPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    // the value is an string and limit only 4 characters to display
    return value.slice(0, 4).concat('...');
  }
}
