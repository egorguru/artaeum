import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ActivationService } from './activation.service'

@Component({
  selector: 'ae-activation',
  templateUrl: './activation.component.html'
})
export class ActivationComponent implements OnInit {

  isError: boolean

  constructor(
    private route: ActivatedRoute,
    private activationService: ActivationService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.activationService.activate(params['key'])
        .subscribe(
          () => this.isError = false,
          () => this.isError = true
        )
    })
  }
}
