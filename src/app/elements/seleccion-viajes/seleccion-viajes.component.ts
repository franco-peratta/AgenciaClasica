import { Component, OnInit } from '@angular/core';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';

@Component({
  selector: 'app-seleccion-viajes',
  templateUrl: './seleccion-viajes.component.html',
  styleUrls: ['./seleccion-viajes.component.css']
})
export class SeleccionViajesComponent implements OnInit {

  viajes: ViajesViewModel[] = [];

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {
    this.loadViajes();
  }

  loadViajes() {
    this.viajesService.getViajesDestacados().subscribe(response => {
      this.viajes = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const viaje_obj: ViajesViewModel = {
          id: id,
          nombre: data.nombre,
          destino: data.destino,
          fotos: data.fotos,
          video: data.video,
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
    console.log(this.viajes);
  }
}