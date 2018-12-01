import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { QuillModule } from 'ngx-quill'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    QuillModule,
    TranslateModule
  ]
})
export class SharedLibsModule {}
