import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService:CategoryService,
              private router:Router) { }

  ngOnInit(): void {
  }

  createCategory(name:string){
    const category:Category={
      name:name
    }
    this.categoryService.createCategory(category).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/'])
    })

  }

}
