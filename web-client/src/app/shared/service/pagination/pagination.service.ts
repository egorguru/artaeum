import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class PaginationService {

  parseAscending(sort: string): boolean {
    let sortArray = sort.split(',')
    sortArray = sortArray.length > 1 ? sortArray : sort.split('%2C')
    if (sortArray.length > 1) {
      return sortArray.slice(-1)[0] === 'desc'
    }
    return true
  }

  parsePage(page: string): number {
    return parseInt(page, 10)
  }

  parsePredicate(sort: string): string {
    return sort.split(',')[0].split('%2C')[0]
  }
}
