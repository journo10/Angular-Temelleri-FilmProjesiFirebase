import { SharedModule } from './../shared/alert/shared.module';
import { CategoriesModule } from './../category/categories.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { MoviesComponent } from './movies.component';
import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { SummaryPipe } from './pipes/summary.pipe';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MoviesRoutingModule,
    CategoriesModule,
    SharedModule
  ],
  declarations: [
    MoviesComponent,
    MovieDetailsComponent,
    SummaryPipe,
    MovieFilterPipe,
    MovieCreateComponent,
    MoviesHomeComponent,
  ],
  exports: [
    MoviesComponent,
    MovieDetailsComponent,
    SummaryPipe,
    MovieFilterPipe,
    MovieCreateComponent,
    MoviesHomeComponent,
  ],
})
export class MoviesModule {}
