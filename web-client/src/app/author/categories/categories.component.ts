import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { CategoryService, Principal, Category, User } from '../../shared'

@Component({
  selector: 'ae-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  currentUser: User
  categories: Category[]

  createCandidate: Category
  updateCandidate: Category
  deleteCandidate: Category

  constructor(
    private categoryService: CategoryService,
    private principal: Principal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.principal.identity().then((u) => {
      this.currentUser = u
      this.loadAll()
    })
  }

  modalCreate(content): void {
    this.createCandidate = new Category()
    this.createCandidate.name = ''
    this.modalService.open(content, { ariaLabelledBy: 'modal-create-category' })
  }

  modalUpdate(content, category: Category): void {
    this.updateCandidate = category
    this.modalService.open(content, { ariaLabelledBy: 'modal-update-category' })
  }

  modalDelete(content, category: Category): void {
    this.deleteCandidate = category
    this.modalService.open(content, { ariaLabelledBy: 'modal-delete-category' })
  }

  createCategory(): void {
    this.modalService.dismissAll('Create category')
    this.categoryService.create(this.createCandidate)
      .subscribe(() => this.loadAll())
  }

  updateCategory(): void {
    this.modalService.dismissAll('Update category')
    this.categoryService.update(this.updateCandidate)
      .subscribe(() => this.loadAll())
  }

  deleteCategory(): void {
    this.modalService.dismissAll('Delete category')
    this.categoryService.delete(this.deleteCandidate._id)
      .subscribe(() => this.loadAll())
  }

  private loadAll(): void {
    this.categoryService.getAll(this.currentUser.id)
      .subscribe((res) => this.categories = res.body)
  }
}
