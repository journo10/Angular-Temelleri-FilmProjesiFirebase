import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ReactiveFormsComponent } from '../reactive-forms/reactive-forms.component';
import { TemplateFormsComponent } from '../template-forms/template-forms.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MoviesComponent },
      { path: 'category/:categoryId', component: MoviesComponent },
      { path: 'create', component: MovieCreateComponent },
      { path: 'template-forms', component: TemplateFormsComponent },
      { path: 'reactive-forms', component: ReactiveFormsComponent },
      { path: ':movieId', component: MovieDetailsComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
