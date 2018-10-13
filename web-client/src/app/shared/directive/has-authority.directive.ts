import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'

import { Principal } from '../auth'

@Directive({
  selector: '[aeHasAuthority]'
})
export class HasAuthorityDirective {

  constructor(
    private principal: Principal,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set aeHasAuthority(value: string | string[]) {
    const authorities = typeof value === 'string' ? [value] : value
    this.viewContainerRef.clear()
    if (this.principal.hasAuthorities(authorities)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
  }
}
