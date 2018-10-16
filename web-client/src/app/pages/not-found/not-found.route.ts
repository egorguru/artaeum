import { Routes } from '@angular/router'

import { NotFoundComponent } from './not-found.component'

export const routes: Routes = [
    { path: '**', component: NotFoundComponent, data: { pageTitle: '404 - Artaeum' } },
    { path: '404', component: NotFoundComponent, data: { pageTitle: '404 - Artaeum' } }
]
