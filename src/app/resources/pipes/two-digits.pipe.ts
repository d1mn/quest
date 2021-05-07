import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigits'
})
export class TwoDigitsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return
    }

    return ('0' + value.toString()).substr(-2) + '.'
  }

}
