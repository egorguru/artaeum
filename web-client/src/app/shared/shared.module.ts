import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { SharedLibsModule } from './shared-libs.module'
import { HasAuthorityDirective } from './directive'
import { APIInterceptor, ApplyTokenInterceptor, AuthExpiredInterceptor } from './interceptor'
import { DateConverterPipe } from './pipe'
import {
  CommentComponent, LikeComponent,
  CommentButtonComponent, PostComponent,
  ModalPostComponent, ArticleComponent
} from './component'

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    HasAuthorityDirective,
    DateConverterPipe,
    CommentComponent,
    LikeComponent,
    CommentButtonComponent,
    PostComponent,
    ModalPostComponent,
    ArticleComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplyTokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  exports: [
    SharedLibsModule,
    HasAuthorityDirective,
    DateConverterPipe,
    CommentComponent,
    LikeComponent,
    CommentButtonComponent,
    PostComponent,
    ModalPostComponent,
    ArticleComponent
  ]
})
export class SharedModule {}
