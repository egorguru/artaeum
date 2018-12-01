import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpClient, HttpBackend } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { MainComponent, FooterComponent, HeaderComponent, SmartButtonComponent } from './layouts'
import { AppRoutingModule } from './app-routing.module'
import { HomeModule } from './home'
import { SharedModule } from './shared'
import { AccountModule } from './account'
import { ProfileModule } from './profile'
import { SettingsModule } from './settings'
import { ArticleModule } from './article'
import { PostModule } from './post'
import { AuthorModule } from './author'
import { TimelineModule } from './timeline'
import { PagesModule } from './pages'
import { SearchModule } from './search'

export function HttpLoaderFactory(handler: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(handler), 'assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    SmartButtonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AccountModule,
    ProfileModule,
    SettingsModule,
    ArticleModule,
    PostModule,
    AuthorModule,
    TimelineModule,
    SearchModule,
    PagesModule
  ],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
