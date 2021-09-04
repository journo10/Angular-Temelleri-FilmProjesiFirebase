import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryRepository } from './category.repository';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  // categoryRepository: CategoryRepository;//categor repositoryden gelen data
  selectedCategory: Category = null;
  displayAll = true;

  constructor(private categoryService:CategoryService) {
    // this.categoryRepository = new CategoryRepository();//categor repositoryden gelen data
    // this.categories = this.categoryRepository.getCategories();//categor repositoryden gelen data
  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data=>{
      this.categories=data;
      console.log(this.categories);
      console.log(data);
    })
  }

  selectCategory(item?: Category) {
    console.log(item)
    if (item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}
