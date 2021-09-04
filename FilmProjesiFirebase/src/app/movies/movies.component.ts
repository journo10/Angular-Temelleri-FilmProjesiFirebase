import { AlertifyService } from './../services/alertify.service';
import { AuthService } from './../services/auth.service';
import { MovieService } from './../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieRepository } from './movie.repository';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService],
})
export class MoviesComponent implements OnInit {
  title: any = 'Film Listesi';
  today: any = new Date();
  movies: Movie[] = [];
  userId:string;
  movieList:string[]=[];
  // populerMovies: Movie[];//repository üzerinden gelen data
  // movieRepository: MovieRepository;//repository üzerinden gelen data
  filterText: string = '';
  error: any;

  constructor(private alertifyService:AlertifyService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService
  ) {
    // this.movieRepository = new MovieRepository();//repository üzerinden gelen data
    // this.movies = this.movieRepository.getMovies();//repository üzerinden gelen data
    // this.populerMovies = this.movieRepository.getPopulerMovies();//repository üzerinden gelen data
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      if(user){
      this.userId=user.id;//Listeye Ekleme kısmı

        this.activatedRoute.params.subscribe((params) => {
        this.movieService.getMovies(params['categoryId']).subscribe(
          (data) => {
            this.movies = data;

        this.movieService.getList(this.userId).subscribe(data=>{
          this.movieList=data;//Listeye eklenen filmlerin ekranda görünmesi
        })},
        (error) => {
            this.error = error;
          });
       });
     }
    });
  }

  //listeye ekle ve çıkar kısmının ekranda görünmesi
  getButtonstate(movie:Movie){
   return this.movieList.findIndex(data=>data===movie.id)>-1
  }

  //Listeye ekle ve çıkar kısmı
  addToList($event: any, movie: Movie) {
    if ($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = 'Listeden Çıkar';
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

      this.movieService.addToMyList({userId:this.userId, movieId:movie.id}).subscribe(()=>{
        this.alertifyService.success(movie.title + ' listeye eklendi.')
      }
       
      )
    } else {
      $event.target.innerText = 'Listeye Ekle';
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

      this.movieService.removeFromList({userId:this.userId,movieId:movie.id})
      .subscribe(()=>{
        this.alertifyService.error(movie.title + ' listeden çıkarıldı.')
      })
    }
  }
}
