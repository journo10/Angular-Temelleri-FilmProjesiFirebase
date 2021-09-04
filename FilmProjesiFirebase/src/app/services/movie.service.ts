import {HttpClient,HttpErrorResponse,HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Movie } from '../movies/movie.model';
import { tap, catchError, map } from 'rxjs/operators';
import { myList } from '../movies/myList.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = 'http://localhost:3000/movies';
  urlFirebase = 'https://angular-movie-app-55c6d-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  //Filmleri getirme
  getMovies(categoryId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.urlFirebase + 'movies.json').pipe(
      map((response) => {
        // gelecek olan id bilgisini obje içindeki id ile değiştirme ve kategoriye göre film getirme kısmıdır.
        const movies: Movie[] = [];
        for (const key in response) {
          if (categoryId) {
            if (categoryId === response[key].categoryId) {
              movies.push({ ...response[key], id: key });
            }
          } else {
            movies.push({ ...response[key], id: key });
          }
        }
        return movies;
      }),
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  //filmin detay kısmı
  getMovieById(movieId: number): Observable<Movie> {
    return this.http
      .get<Movie>(this.urlFirebase + 'movies/' + movieId + '.json')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  //Film Ekleme
  getCreateMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };

    return this.http
      .post<Movie>(this.urlFirebase + '/movies.json', movie, httpOptions)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  //Listeye Ekle kısmı
  addToMyList(item:myList):Observable<myList>{
    return this.http.post<myList>(this.urlFirebase + "/users/" + item.userId + "/list/" + item.movieId + ".json",
    {
       dateAdded:new Date().getTime()
    }).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  //Listeden çıkar kısmı
  removeFromList(item:myList):Observable<myList>{
   return this.http.delete<myList>(this.urlFirebase + "/users/" + item.userId + "/list/" + item.movieId + ".json")
   .pipe(
    tap((data) => console.log(data)),
    catchError(this.handleError)
  );
  }

  //Listeye eklenen filmlerin ekranda görünmesi
  getList(userId:string):Observable<string[]>{
    return this.http.get<string[]>(this.urlFirebase + "/users/" + userId + "/list.json")
    .pipe(
      map(response=>{
        const movies:string[]=[];

        for(const key in response){
          movies.push(key);
        }
        return movies;
      }),
      tap(data=>console.log(data)),
      catchError(this.handleError)
    )
  }

  //Error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Client yada Network tarafında
      console.log('error:' + error.error.message);
    } else {
      //Backend tarafında
      switch (error.status) {
        case 404:
          console.log('not found');
          break;
        case 403:
          console.log('access denied');
          break;
        case 500:
          console.log('interval server');
          break;
        default:
          console.log('bilinmeyen bir hata oluştu.');
      }
    }

    return throwError('Bir hata oluştu.');
  }
}
