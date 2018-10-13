import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { SharedLibsModule } from './shared-libs.module'
import { HasAuthorityDirective } from './directive'
import { APIInterceptor, AuthExpiredInterceptor } from './interceptor'

@NgModule({
  imports: [SharedLibsModule],
  declarations: [HasAuthorityDirective],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }
  ],
  exports: [HasAuthorityDirective]
})
export class SharedModule {}
