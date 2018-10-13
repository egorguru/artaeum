import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { HEADER_ROUTE } from './layouts/header/header.route'

@NgModule({
    imports: [
        RouterModule.forRoot([HEADER_ROUTE], { useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
