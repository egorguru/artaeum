import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'

import { PaginationService } from './pagination.service'

@Injectable({ providedIn: 'root' })
export class ResolvePagingParamsService implements Resolve<any> {

  constructor(private paginationService: PaginationService) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const page = route.queryParams['page'] ? route.queryParams['page'] : '1'
    return {
      page: this.paginationService.parsePage(page)
    }
  }
}
