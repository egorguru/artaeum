import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { MainComponent, FooterComponent, HeaderComponent } from './layouts'
import { AppRoutingModule } from './app-routing.module'
import { HomeModule } from './home'
import { SharedModule } from './shared'
import { AccountModule } from './account'
import { ProfileModule } from './profile'
import { SettingsModule } from './settings'
import { BlogModule } from './blog'
import { PostModule } from './post'
import { AuthorModule } from './author'
import { PagesModule } from './pages'

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AccountModule,
    ProfileModule,
    SettingsModule,
    BlogModule,
    PostModule,
    AuthorModule,
    PagesModule
  ],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
