import { Movie } from './movie.model';

export class MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [
      { id: 1, categoryId:1, title: 'Film 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde facilis, animi provident tempore eum, quae soluta, maxime nisi at repellat tempora. Quidem voluptatum eos in quibusdam numquam, modi, inventore quo iusto corrupti rem soluta harum eveniet quod? Ad, sit deserunt, iusto adipisci animi quo sequi facere velit debitis, blanditiis magni!', imageUrl: '1.jpeg', isPopuler:false,datePublished:new Date(2011,10,10) },
      { id: 2, categoryId:2, title: 'Film 2', description: 'Açıklama 2', imageUrl: '2.jpeg', isPopuler:true ,datePublished:new Date(2011,11,11) },
      { id: 3, categoryId:3, title: 'Film 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde facilis, animi provident tempore eum, quae soluta, maxime nisi at repellat tempora. Quidem voluptatum eos in quibusdam numquam, modi, inventore quo iusto corrupti rem soluta harum eveniet quod? Ad, sit deserunt, iusto adipisci animi quo sequi facere velit debitis, blanditiis magni!', imageUrl: '3.jpeg' , isPopuler:false,datePublished:new Date(2011,9,9) },
      { id: 4, categoryId:4, title: 'Film 4', description: 'Açıklama 4', imageUrl: '4.jpeg' , isPopuler:true,datePublished:new Date(2011,7,7) },
      { id: 5, categoryId:5, title: 'Film 5', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde facilis, animi provident tempore eum, quae soluta, maxime nisi at repellat tempora. Quidem voluptatum eos in quibusdam numquam, modi, inventore quo iusto corrupti rem soluta harum eveniet quod? Ad, sit deserunt, iusto adipisci animi quo sequi facere velit debitis, blanditiis magni!', imageUrl: '5.jpeg' , isPopuler:true,datePublished:new Date(2011,5,5) },
    ];
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  getPopulerMovies(): Movie[] {
    return this.movies.filter(i=>i.isPopuler);
  }

  getMovieById(id: number): Movie {
    return this.movies.find((i) => i.id == id);
  }
}
