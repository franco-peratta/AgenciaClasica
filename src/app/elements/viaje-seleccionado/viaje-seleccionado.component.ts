import { Component, OnInit } from '@angular/core';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { ActivatedRoute } from '@angular/router';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mensaje } from 'src/app/models/mensaje';
import { MessagesService } from 'src/app/services/messages.service';

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
  form: FormGroup;

  constructor(
    private viajesService: ViajesService,
    private route: ActivatedRoute,
    config: NgbCarouselConfig,
    private formBuilder: FormBuilder,
    private mensajes_service: MessagesService) {
    config.interval = 3000;
    config.wrap = true;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
    });
    this.loadViaje();
    this.loadOfertas();

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      mail: ['', Validators.required],
      adultos: ['', null],
      niños: ['', null],
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
      this.toggleItinerario();
      this.toggleObs();
    });
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
    if (document.getElementById("form_div").style.display === "none") {
      document.getElementById('form_div').style.display = "block";
      document.getElementById('boton_reserva').style.display = "none";
      window.scrollBy(0, 100); // Scroll 100px down
    }
    else {
      document.getElementById('form_div').style.display = "none";
    }
  }

  send_message() {
    if (this.form.invalid) {
      return;
    }

    let mensaje: Mensaje = {
      mail: this.form.value.mail,
      nombre: this.form.value.nombre,
      asunto: this.viaje.nombre,
      mensaje: this.form.value.mensaje,
      createdDate: new Date(),
      leido: false,
    }

    this.mensajes_service.saveMensaje(mensaje);
    alert("Mensaje enviado con exito. En breve nos pondremos en contacto");

    //limpio los campos del formulario
    this.form.reset();
    this.toggle_form();
  }

  shareFacebook() {
    let url = "https://www.facebook.com/sharer/sharer.php?u=".concat(window.location.href);
    console.log(url);
    let win = window.open(url, '_blank');
    win.focus();
  }

  shareTwitter() {
    //https://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3

    let url = "https://twitter.com/share?text=".concat(this.viaje.nombre).concat("&url=").concat(window.location.href).concat("&hashtags=AgenciaClasica");
    console.log(url);
    let win = window.open(url, '_blank');
    win.focus();
  }

  /*shareGoogle() {
    //href="https://plus.google.com/share?url=https://simplesharebuttons.com"
    let url = "https://www.facebook.com/sharer/sharer.php?u=".concat(window.location.href);
    console.log(url);
    let win = window.open(url, '_blank');
    win.focus();
  }*/
}