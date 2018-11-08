import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'ae-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Search - Artaeum')
    this.activatedRoute.queryParams
      .subscribe((params) => this.query = params['query'])
  }

  onSubmit(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { query: this.query }
    })
  }
}
