import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordSeperator'
})
export class WordSeperatorPipe implements PipeTransform {

  transform(result: string): string {
    // Add space before every uppercase and trim off leading and trailing spaces
    result = result
    .replace(/(_|-)/g, ' ')
    .trim()
    .replace(/\w\S*/g, function(str) {
      return str.charAt(0).toUpperCase() + str.substr(1)
    })
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')

    return result;
  }
}
