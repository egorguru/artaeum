import { Route } from '@angular/router'

import { HeaderComponent } from './header.component'

export const HEADER_ROUTE: Route = {
    path: '',
    component: HeaderComponent,
    outlet: 'header'
}
