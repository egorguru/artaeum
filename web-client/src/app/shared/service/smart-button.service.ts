import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { environment as env } from '../../../environments/environment'

interface SmartButtonElement {
  className: string
  link: string,
  title: string
}

@Injectable({ providedIn: 'root' })
export class SmartButtonService {

  elements: SmartButtonElement[] = []

  constructor(private router: Router) {
    router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        this.elements = []
      }
    })
  }

  add(element: SmartButtonElement): void {
    if (Object.keys(this.elements).length < env.COUNT_OF_SMART_BUTTON_ELEMENTS) {
      this.elements.push(element)
    }
  }

  get(): SmartButtonElement[] {
    return this.elements
  }
}
