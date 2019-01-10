import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { SharedLibsModule } from './shared-libs.module'
import { HasAuthorityDirective } from './directive'
import { APIInterceptor, ApplyTokenInterceptor, AuthExpiredInterceptor } from './interceptor'
import { DateConverterPipe, ImageAppenderPipe } from './pipe'
import {
  CommentComponent, LikeComponent,
  CommentButtonComponent, PostComponent,
  ArticleComponent, LoaderComponent
} from './component'

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    HasAuthorityDirective,
    DateConverterPipe,
    ImageAppenderPipe,
    CommentComponent,
    LikeComponent,
    CommentButtonComponent,
    PostComponent,
    ArticleComponent,
    LoaderComponent
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
    ImageAppenderPipe,
    CommentComponent,
    LikeComponent,
    CommentButtonComponent,
    PostComponent,
    ArticleComponent,
    LoaderComponent
  ]
})
export class SharedModule {}
