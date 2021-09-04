import { Category } from '../category/category.model';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css'],
  providers: [CategoryService, MovieService],
})
export class TemplateFormsComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router
  ) {}

  categories: Category[];
  model: any = {
    categoryId:'',//Seçiniz kısmı görünmesi için
  };

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  createMovies(form:NgForm) {
    const movie = {
      id: 0,
      title: this.model.title,
      description: this.model.description,
      imageUrl: this.model.imageUrl,
      isPopuler: false,
      datePublished: new Date().getTime(),
      categoryId: this.model.categoryId,
    };
    this.movieService.getCreateMovie(movie).subscribe((data) => {
      this.router.navigate(['/movies', data.id]);
    });
  }
}
