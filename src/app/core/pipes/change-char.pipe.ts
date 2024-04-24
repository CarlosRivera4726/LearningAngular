import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeChar',
  standalone: true,
})
export class ChangeCharPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    // change the value that is passed to the pipe to char '*' eight character
    return value.replace(/./g, '*').split('').slice(0, 13).join('');
  }
}
