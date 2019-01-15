import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { QuillModule } from 'ngx-quill'
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { ImageCropperModule } from 'ng2-img-cropper'

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
    })
  ],
  providers: [TranslateStore],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    QuillModule,
    TranslateModule,
    ImageCropperModule
  ]
})
export class SharedLibsModule { }
