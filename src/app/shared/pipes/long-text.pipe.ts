import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longText'
})
export class LongTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (limit && value.length > limit) {
      return value.substring(0, limit).concat('...');
    }
    return value;
  }

}
