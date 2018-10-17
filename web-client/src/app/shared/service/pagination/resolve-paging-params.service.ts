import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'

import { PaginationService } from './pagination.service'

@Injectable({ providedIn: 'root' })
export class ResolvePagingParamsService implements Resolve<any> {

  constructor(private paginationService: PaginationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const page = route.queryParams['page'] ? route.queryParams['page'] : '1'
    const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc'
    return {
      page: this.paginationService.parsePage(page),
      predicate: this.paginationService.parsePredicate(sort),
      ascending: this.paginationService.parseAscending(sort)
    }
  }
}
