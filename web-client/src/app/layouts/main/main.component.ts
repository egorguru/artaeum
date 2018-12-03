import { Component, OnInit } from '@angular/core'

import { I18nService } from '../shared'

@Component({
  selector: 'ae-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.i18nService.init()
  }
}
