import { ImageValidator } from './../validators/image.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../category/category.model';
import { CategoryService } from '../services/category.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css'],
  providers: [CategoryService, MovieService],
})
export class ReactiveFormsComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router
  ) {}
  categories: Category[];
  model: any = {
    categoryId: '', //Seçiniz kısmı görünmesi için
  };

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  movieForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [
      Validators.required,
      ImageValidator.isValidExtention,
    ]),
    categoryId: new FormControl('', [Validators.required]),
  });

  //Formun içindeki değerlerin silinmesi
  clearForm() {
    this.movieForm.patchValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: '',
    });
  }

  createMovies() {
    // console.log(this.movieForm);
    // console.log(this.movieForm.value);
    // console.log(this.movieForm.value.title);
    const movie = {
      id: 0,
      title: this.movieForm.value.title,
      description: this.movieForm.value.description,
      imageUrl: this.movieForm.value.imageUrl,
      isPopuler: false,
      datePublished: new Date().getTime(),
      categoryId: this.movieForm.value.categoryId,
    };
    this.movieService.getCreateMovie(movie).subscribe((data) => {
      this.router.navigate(['/movies', data.id]);
    });
  }
}
