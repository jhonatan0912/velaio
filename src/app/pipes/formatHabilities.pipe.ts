import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHabilities',
  standalone: true
})
export class FormatHabilitiesPipe implements PipeTransform {

  transform(value: string[]): string {
    return value.join(', ');
  }

}
