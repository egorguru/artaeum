import { Component, OnInit } from '@angular/core'
import { environment as env } from '../../../environments/environment'

import { I18nService } from '../shared'

@Component({
  selector: 'ae-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  languages: any
  currentLang: string

  constructor(private i18nService: I18nService) {}

  ngOnInit(): void {
    this.languages = env.LANGUAGES
    this.currentLang = this.i18nService.getCurrentLang() || this.i18nService.getDefaultLang()
    this.i18nService.getOnLangChange().subscribe((event) => {
      this.currentLang = event.lang
    })
  }

  changeLanguage(lang: string): void {
    this.i18nService.changeLanguage(lang)
  }
}
