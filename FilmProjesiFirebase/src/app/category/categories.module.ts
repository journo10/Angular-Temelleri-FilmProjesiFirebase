import { SharedModule } from './../shared/alert/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryComponent } from './category.component';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [
      CategoryComponent, 
      CategoryCreateComponent
    ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      {path: 'categories/create',
      component: CategoryCreateComponent,canActivate: [AuthGuard],
      }, //tek bir tane olduğu için birden fazla olsaydı onun içinde routing module oluşturman gerekirdi.
    ]),
    SharedModule
  ],
  exports:[
    CategoryComponent, 
    CategoryCreateComponent
  ]
})
export class CategoriesModule {}
