import { Component, OnInit } from '@angular/core';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.css'],
})

export class ProgramasComponent implements OnInit {

  constructor(private viajesService: ViajesService) { }

  viajes: ViajesViewModel[] = [];
  filter: FormGroup;

  ngOnInit() {
    this.filter = new FormGroup({
      inputText: new FormControl('')
    });
    this.loadViajes();
  }

  loadViajes() {
    this.viajesService.getViajes().subscribe(response => {
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const viaje_obj: ViajesViewModel = {
          id: id,
          nombre: data.nombre,
          destino: data.destino,
          portada: data.portada,
          fotos: data.fotos,
          video: data.video,
          lastModifiedDate: data.lastModifiedDate.toDate(),
          duracion: data.duracion,
          precio: data.precio,
          descripcion: data.descripcion,
          observaciones: data.observaciones,
          itinerario: data.itinerario,
          destacado: data.destacado,
        };
        this.viajes.push(viaje_obj);
      });
    });
  }
}
