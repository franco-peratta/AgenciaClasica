import { Component, OnInit } from '@angular/core';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { ActivatedRoute } from '@angular/router';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';

@Component({
  selector: 'app-viaje-seleccionado',
  templateUrl: './viaje-seleccionado.component.html',
  styleUrls: ['./viaje-seleccionado.component.css'],
  providers: [NgbCarouselConfig]
})
export class ViajeSeleccionadoComponent implements OnInit {

  images = [];
  id: string;
  viaje: ViajesViewModel;

  constructor(private viajesService: ViajesService, private route: ActivatedRoute, config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
    });
    this.loadViaje();
  }

  loadViaje() {
    const data = this.viajesService.getViaje(this.id).subscribe(response => {
      const data = response.data();//aqui se guardan todos los atributos del viaje

      const viaje_obj: ViajesViewModel = {
        id: this.id,
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
      };
      this.viaje = viaje_obj;

      this.images.push(viaje_obj.portada);
      for (let entry of viaje_obj.fotos) { //of me da el contenido dentro del indice (entry: fotos[i])
        this.images.push(entry);
      }
    })
  }

  toggleItinerario() {
    let itinerario = document.getElementById("itinerario");
    if (itinerario.className.indexOf("panel-invi") >= 0) {
      itinerario.classList.remove("panel-invi");
      itinerario.classList.add("panel-visible");
    }
    else {
      itinerario.classList.remove("panel-visible");
      itinerario.classList.add("panel-invi");
    }
  }

  toggleObs() {
    let obs = document.getElementById("observaciones");
    if (obs.className.indexOf("panel-invi") >= 0) {
      obs.classList.remove("panel-invi");
      obs.classList.add("panel-visible");
    }
    else {
      obs.classList.remove("panel-visible");
      obs.classList.add("panel-invi");
    }
  }
}