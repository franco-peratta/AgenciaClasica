import { Component, OnInit } from '@angular/core';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { ActivatedRoute } from '@angular/router';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-viaje-seleccionado',
  templateUrl: './viaje-seleccionado.component.html',
  styleUrls: ['./viaje-seleccionado.component.css'],
  providers: [NgbCarouselConfig]
})
export class ViajeSeleccionadoComponent implements OnInit {

  images = [];
  ofertas = [];
  id: string;
  viaje: ViajesViewModel;
  formdb: FormGroup;

  constructor(private viajesService: ViajesService, private route: ActivatedRoute, config: NgbCarouselConfig, private formBuilder: FormBuilder) {
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
    this.loadOfertas();

    this.formdb = this.formBuilder.group({
      nombre: ['', Validators.required],
      mail: ['', Validators.required],
      adultos: ['', Validators.required],
      niños: ['', Validators.required],
      mensaje: ['', null],
    })
  }

  loadViaje() {
    this.viajesService.getViaje(this.id).subscribe(response => {
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
        destacado: data.destacado,
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
    let icon = document.getElementById("icon_itinerario");

    if (itinerario.className.indexOf("panel-invi") >= 0) {
      itinerario.classList.remove("panel-invi");
      itinerario.classList.add("panel-visible");
      let text = document.getElementById("itinerario");
      text.innerHTML = this.viaje.itinerario;

      icon.className = "fa fa-angle-up";
    }
    else {
      itinerario.classList.remove("panel-visible");
      itinerario.classList.add("panel-invi");
      icon.className = "fa fa-angle-down";
    }
  }

  toggleObs() {
    let obs = document.getElementById("observaciones");
    let icon = document.getElementById("icon_observaciones");

    if (obs.className.indexOf("panel-invi") >= 0) {
      obs.classList.remove("panel-invi");
      obs.classList.add("panel-visible");
      let text = document.getElementById("observaciones");
      text.innerHTML = this.viaje.observaciones;

      icon.className = "fa fa-angle-up";
    }
    else {
      obs.classList.remove("panel-visible");
      obs.classList.add("panel-invi");
      icon.className = "fa fa-angle-down";
    }
  }

  loadOfertas() {
    this.viajesService.getViajesUltimoMomento().subscribe(res => {
      res.docs.forEach(value => {
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
        this.ofertas.push(viaje_obj);
      });
    });
  }

  //ARREGLAR ESTA BARBARIDAD
  reloadWithDifferentId() {
    window.location.reload();
  }

  toggle_form() {
    document.getElementById('form_div').style.display = "block";
    document.getElementById('boton_reserva').style.display = "none";
  }

  reservar_programa() {
    if (this.formdb.invalid) {
      return;
    }
    let data = this.formdb.value;
  }
}