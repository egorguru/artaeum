import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { environment as env } from '../../../environments/environment'

@Component({
  selector: 'ae-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  languages: any
  currentLang: string

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.languages = env.LANGUAGES
    this.currentLang = this.translateService.defaultLang
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLang = event.lang
    })
  }

  changeLanguage(lang: string) {
    window.localStorage.setItem('lang_key', lang)
    this.translateService.use(lang)
  }
}
