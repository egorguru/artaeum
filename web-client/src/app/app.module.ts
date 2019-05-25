import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

import { FooterComponent, MainComponent, SmartButtonComponent } from './layouts'
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
import { HeaderModule } from './layouts/header/header.module'

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    SmartButtonComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
    PagesModule,
    HeaderModule,
  ],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
