import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { QuillModule } from 'ngx-quill'
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { ImageCropperModule } from 'ng2-img-cropper'
import { LyThemeModule, LY_THEME } from '@alyle/ui'
import { LyToolbarModule } from '@alyle/ui/toolbar'
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images'
import { MinimaLight } from '@alyle/ui/themes/minima'

export function HttpLoaderFactory(handler: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(handler), 'assets/i18n/', '.json')
}

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    LyThemeModule.setTheme('minima-light')
  ],
  providers: [
    TranslateStore,
    { provide: LY_THEME, useClass: MinimaLight, multi: true }
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    QuillModule,
    TranslateModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    LyToolbarModule,
    LyResizingCroppingImageModule
  ]
})
export class SharedLibsModule { }
