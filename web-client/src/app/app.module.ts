import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

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

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    SmartButtonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
export class AppModule {}
