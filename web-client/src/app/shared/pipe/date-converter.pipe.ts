import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { environment as env } from '../../../environments/environment'

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: any, exactTime = false): string {
    const date = new Date(value)
    const currentLang = this.translateService.currentLang || this.translateService.defaultLang
    let result = `${env.MONTHS[currentLang][date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    if (exactTime) {
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      result = `${result} ${date.getHours()}:${minutes}`
    }
    return result
  }


}
