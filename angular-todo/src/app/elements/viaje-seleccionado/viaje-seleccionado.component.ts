import { Component, OnInit } from '@angular/core';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { ActivatedRoute } from '@angular/router';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';

@Component({
  selector: 'app-viaje-seleccionado',
  templateUrl: './viaje-seleccionado.component.html',
  styleUrls: ['./viaje-seleccionado.component.css']
})
export class ViajeSeleccionadoComponent implements OnInit {

  id: string;
  viaje: ViajesViewModel = null;

  constructor(private viajesService: ViajesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
    });

    this.loadViaje();
    //console.log(this.viajesService.getViaje(this.id));
  }

  loadViaje() {
    const data = this.viajesService.getViaje(this.id).subscribe(response => {
      const data = response.data();
      //ACA TENGO TODA LA DATA PERRO (en data)

      const viaje_obj: ViajesViewModel = {
        id: this.id,
        destino: data.destino,
        foto: data.foto,
        video: data.video,
        lastModifiedDate: data.lastModifiedDate.toDate(),
        duracion: data.duracion,
        precio: data.precio,
        descripcion: data.descripcion,
        observaciones: data.observaciones,
        itinerario: data.itinerario,
      };
      this.viaje = viaje_obj;
    })
  }

}