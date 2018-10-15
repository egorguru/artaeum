import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  exports: [
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedLibsModule {}
