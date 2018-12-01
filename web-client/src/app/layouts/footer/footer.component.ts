import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'ae-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  languages = {
    en: '🇺🇸',
    ru: '🇷🇺'
  }

  currentLang: string

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.currentLang = this.translateService.defaultLang
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLang = event.lang
    })
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang)
  }
}
