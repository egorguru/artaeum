import { NgModule } from '@angular/core'
import { HeaderComponent } from './header.component'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule {
}
