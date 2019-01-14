import { Injectable } from '@angular/core'
import Compressor from 'compressorjs'

@Injectable({ providedIn: 'root' })
export class ImageHelper {

  compress(file: Blob, width?: number, height?: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-unused-expression
      new Compressor(file, {
        quality: 0.5,
        width,
        height,
        success(result) {
          resolve(result)
        },
        error(error) {
          reject(error)
        }
      })
    })
  }

  toBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader()
      reader.onloadend = () => resolve(reader.result.toString())
      reader.readAsDataURL(file)
    })
  }
}
