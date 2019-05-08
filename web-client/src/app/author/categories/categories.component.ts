import { Component, OnInit } from '@angular/core'

import { CategoryService, Principal, Category, User } from '../../shared'

@Component({
  selector: 'ae-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  currentUser: User
  categories: Category[]

  updateCandidate: Category
  deleteCandidate: Category

  constructor(
    private categoryService: CategoryService,
    private principal: Principal
  ) {}

  ngOnInit(): void {
    this.principal.identity().then((u) => {
      this.currentUser = u
      this.loadAll()
    })
  }

  createCategory(name: string): void {
    const category = new Category()
    category.name = name
    this.categoryService.create(category)
      .subscribe(() => this.loadAll())
  }

  updateCategory(name: string): void {
    this.updateCandidate.name = name
    this.categoryService.update(this.updateCandidate)
      .subscribe(() => this.loadAll())
  }

  deleteCategory(): void {
    this.categoryService.delete(this.deleteCandidate._id)
      .subscribe(() => this.loadAll())
  }

  setUpdateCandidate(): void {
    this.updateCandidate = new Category()
  }

  setDeleteCandidate(category: Category): void {
    this.deleteCandidate = category
  }

  private loadAll(): void {
    this.categoryService.getAll(this.currentUser.id)
      .subscribe((res) => this.categories = res.body)
  }
}
