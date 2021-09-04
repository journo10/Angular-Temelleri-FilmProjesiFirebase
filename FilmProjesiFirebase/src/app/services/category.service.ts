import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../category/category.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:3000/categories';
  urlFirebase = 'https://angular-movie-app-55c6d-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  //categoryleri getirme
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlFirebase + 'categories.json').pipe(
      map(response=>{//category ekleme kısmı
        const categories:Category[]=[]
        for(const key in response){
          categories.push({...response[key],id:key})
        }
        return categories;
      })
    );
  }

  //category ekleme
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.urlFirebase + 'categories.json',category);
  }
}
