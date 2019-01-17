import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { ImgCropperConfig, ImgCropperEvent } from '@alyle/ui/resizing-cropping-images'
import { LyTheme2 } from '@alyle/ui'

const styles = {
  cropping: {
    width: '100%',
    height: '500px',
  }
}

@Component({
  selector: 'ae-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageEditorComponent implements OnInit {

  @Input() width: number
  @Input() height: number
  @Input() resultWidth: number
  @Input() resultHeight: number

  @Output() aeOnResult = new EventEmitter<string>()

  classes = this.theme.addStyleSheet(styles)
  cropperConfig: ImgCropperConfig

  constructor(private theme: LyTheme2) {}

  ngOnInit(): void {
    this.cropperConfig = {
      width: this.width,
      height: this.height,
      type: 'image/jpeg',
      output: {
        width: this.resultWidth,
        height: this.resultHeight
      }
    }
  }

  onCropped(e: ImgCropperEvent): void {
    this.aeOnResult.emit(e.dataURL)
  }
}
