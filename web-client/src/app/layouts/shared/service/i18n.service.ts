import { Injectable, EventEmitter } from '@angular/core'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { environment as env } from '../../../../environments/environment'

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
    if (this.principal.isAuthenticated()) {
      this.principal.identity().then((u) => this.translateService.use(u.langKey))
    } else if (typeof window !== 'undefined' && window.localStorage.getItem('lang_key')) {
      this.translateService.use(window.localStorage.getItem('lang_key'))
    } else {
      const userLang = navigator.language.substring(0, 2)
      if (env.LANG_KEYS.includes(userLang)) {
        this.translateService.use(userLang)
      }
    }
  }

  changeLanguage(lang: string): void {
    window.localStorage.setItem('lang_key', lang)
    if (this.principal.isAuthenticated()) {
      this.principal.identity().then((u) => {
        u.langKey = lang
        this.accountService.save(u).subscribe()
      })
    }
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
