import { MovieService } from '../../services/movie.service';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService],
})
export class MovieCreateComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router
  ) {}

  categories: Category[];

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  //Film Ekleme
  createMovie(title: any, description: any, imageUrl: any, categoryId: any) {
    const movie = {
      id: 0,
      title: title.value,
      description: description.value,
      imageUrl: imageUrl.value,
      isPopuler: false,
      datePublished: new Date().getTime(),
      categoryId: categoryId.value,
    };
    this.movieService.getCreateMovie(movie).subscribe((data) => {
      this.router.navigate(['/movies']);
    });
  }
}
