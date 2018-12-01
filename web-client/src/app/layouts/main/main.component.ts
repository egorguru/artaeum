import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'ae-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en')
  }
}
