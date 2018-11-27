import { Pipe, PipeTransform } from '@angular/core'
import { environment as env } from '../../../environments/environment'

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: any, exactTime = false): string {
    const date = new Date(value)
    let result = `${env.MOUNTHS_IN_ENGLISH[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    if (exactTime) {
      result = `${result} ${date.getHours()}:${date.getMinutes()}`
    }
    return result
  }
}
