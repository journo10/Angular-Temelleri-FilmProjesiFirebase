import { Movie } from '../movie.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(movies: Movie[], filterText: string): Movie[] {
    filterText = filterText.toLowerCase(); //Arama küçük harfe göre yapılır.

    return filterText? movies.filter((m: Movie) =>
     m.title.toLowerCase().indexOf(filterText) !== -1 ||
     m.description.toLowerCase().indexOf(filterText) !== -1) :movies;//Arama başlık(title) ve açıklama(description) göre yapılır.
  }
}
