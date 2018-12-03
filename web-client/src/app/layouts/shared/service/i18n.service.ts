import { Injectable, EventEmitter } from '@angular/core'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'

import { Principal, AccountService } from '../../../shared'

@Injectable({ providedIn: 'root' })
export class I18nService {

  constructor(
    public readonly translateService: TranslateService,
    private principal: Principal,
    private accountService: AccountService
  ) {
    this.translateService.setDefaultLang('en')
  }

  init(): void {
    if (typeof window !== 'undefined' && window.localStorage.getItem('lang_key')) {
      this.translateService.use(window.localStorage.getItem('lang_key'))
    } else if (this.principal.isAuthenticated()) {
      this.principal.identity()
        .then((u) => this.translateService.use(u.langKey))
    }
  }

  changeLanguage(lang: string): void {
    window.localStorage.setItem('lang_key', lang)
    this.principal.identity().then((u) => {
      u.langKey = lang
      this.accountService.save(u).subscribe()
    })
    this.translateService.use(lang)
  }

  getDefaultLang(): string {
    return this.translateService.defaultLang
  }

  getCurrentLang(): string {
    return this.translateService.currentLang
  }

  getOnLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange
  }
}
