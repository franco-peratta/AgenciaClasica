import { Pipe, PipeTransform } from '@angular/core';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(viajes: ViajesViewModel[], searchText: string): any {
    if (!searchText) {
      return viajes;
    }
    return viajes.filter((index: ViajesViewModel) => {
      return index.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        index.destino.toLowerCase().includes(searchText.toLowerCase());
    });

  }

}