import { Pipe, PipeTransform } from '@angular/core'
import { environment as env } from '../../../environments/environment'

@Pipe({
  name: 'imageAppender'
})
export class ImageAppenderPipe implements PipeTransform {

  transform(id: string, service: string, resource: string): string {
    return `${env.IMAGE_BASE_URL}${service}/${id}-${resource}.jpg`
  }
}
