import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { Viajes } from 'src/app/models/viajes';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { MensajeViewModel } from 'src/app/models/mensaje-view-model';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formdb: FormGroup;
  mensajes: MensajeViewModel[];
  viajes: ViajesViewModel[];

  constructor(
    private formBuilder: FormBuilder,
    private viajesService: ViajesService,
    private auth: AuthService,
    private msj: MessagesService) { }

  ngOnInit() {
    this.formdb = this.formBuilder.group({
      nombre: ['', Validators.required],
      destino: ['', Validators.required],
      duracion: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      itinerario: ['', Validators.required],
      obs: ['', null],
      portada: ['', Validators.required],
      foto1: ['', Validators.required],
      foto2: ['', Validators.required],
      foto3: ['', Validators.required],
      destacado: ['', null]
    });

    this.getMensajes();
    this.loadViajes();
  }

  saveViaje() {
    if (this.formdb.invalid) {
      return;
    }

    //CREO LA GALERIA DE IMAGENES
    let galeria = [];
    galeria.push(this.formdb.value.foto1);
    galeria.push(this.formdb.value.foto2);
    galeria.push(this.formdb.value.foto3);

    //Lo tengo que hacer manualmente porque si no le agrega a viaje los atributos
    //foto 1 2 y 3 en vez del arreglo de fotos.
    //Ver si modificando el formulario puedo cambiar esto
    //para que funcione haciendo "let viaje: Viajes = this.formdb.value;"
    let viaje: Viajes = {
      nombre: this.formdb.value.nombre,
      destino: this.formdb.value.destino,
      portada: this.formdb.value.portada,
      fotos: galeria,
      //video: this.formdb.value.video, HAY QUE AGREGARLO AL FORMULARIO
      video: "",
      duracion: this.formdb.value.duracion,
      precio: this.formdb.value.precio,
      descripcion: this.formdb.value.descripcion,
      observaciones: this.formdb.value.obs,
      itinerario: this.formdb.value.itinerario,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      destacado: this.formdb.value.destacado,
    }

    this.viajesService.saveViajes(viaje)
      .then(() => {
        alert("Viaje guardado con exito!");
        this.formdb.reset();
        this.toggleABM();
        this.loadViajes();
      })
      .catch(err => alert(err));
  }

  logOut() {
    this.auth.signOut();
  }

  getMensajes() {
    this.mensajes = [];
    this.msj.getMensajes().subscribe(response => {
      response.docs.forEach(value => {
        const data = value.data();
        const msj_obj: MensajeViewModel = {
          id: value.id,
          nombre: data.nombre,
          mail: data.mail,
          createdDate: data.createdDate.toDate(),
          asunto: data.asunto,
          mensaje: data.mensaje,
          leido: data.leido
        };
        this.mensajes.push(msj_obj);
      });
    });
  }

  loadViajes() {
    this.viajesService.getViajes().subscribe(response => {
      this.viajes = [];
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

  /*marcarComoLeido(mensaje: MensajeViewModel) {
    console.log("entre marcar como leido ", mensaje.id);
  }*/

  borrarMensaje(mensaje: MensajeViewModel) {
    this.msj.deleteMensaje(mensaje.id).then(() => {
      //Refresco la lista de mensajes
      this.getMensajes();
      alert("Mensaje borrado con exito");
    }
    );
  }

  toggleABM() {
    let abm = document.getElementById("formulario1");
    let icon = document.getElementById("iconABM");

    if (abm.className.indexOf("panel-invi") >= 0) {
      abm.classList.remove("panel-invi");
      abm.classList.add("panel-visible");
      icon.className = "fa fa-angle-up";
    }
    else {
      abm.classList.remove("panel-visible");
      abm.classList.add("panel-invi");
      icon.className = "fa fa-angle-down";
    }
  }

  toggleEdit() {
    let abm = document.getElementById("formulario2");
    let icon = document.getElementById("iconEdit");

    if (abm.className.indexOf("panel-invi") >= 0) {
      abm.classList.remove("panel-invi");
      abm.classList.add("panel-visible");
      icon.className = "fa fa-angle-up";
      //this.cargarFormEdit();
    }
    else {
      abm.classList.remove("panel-visible");
      abm.classList.add("panel-invi");
      icon.className = "fa fa-angle-down";
    }
  }

  cargarViajeAEditar() {
    
    let viaje = this.viajes[(<HTMLInputElement>document.getElementById("select")).value];

    //chequeo que no sea ni null ni undefined
    if (viaje != null) {
      (<HTMLInputElement>document.getElementById("nombre")).value = viaje.nombre;

      (<HTMLInputElement>document.getElementById("destino")).value = viaje.destino;

      (<HTMLInputElement>document.getElementById("duracion")).value = viaje.duracion;

      (<HTMLInputElement>document.getElementById("precio")).value = viaje.precio;

      (<HTMLInputElement>document.getElementById("portada")).value = viaje.portada;

      (<HTMLInputElement>document.getElementById("destacado")).checked = viaje.destacado;

      (<HTMLInputElement>document.getElementById("edit_button")).disabled = false;
      (<HTMLInputElement>document.getElementById("delete_button")).disabled = false;
    }
  }

  editViaje() {
    let viaje_index = (<HTMLInputElement>document.getElementById("select")).value;

    //Creo el objeto con los campos que permiti que se puedan cambiar
    let viaje = {
      nombre: (<HTMLInputElement>document.getElementById("nombre")).value,
      destino: (<HTMLInputElement>document.getElementById("destino")).value,
      portada: (<HTMLInputElement>document.getElementById("portada")).value,
      duracion: (<HTMLInputElement>document.getElementById("duracion")).value,
      precio: (<HTMLInputElement>document.getElementById("precio")).value,
      destacado: (<HTMLInputElement>document.getElementById("destacado")).checked,
    }
    //realizo el update de la DB
    this.viajesService.editViajesPartial(this.viajes[viaje_index].id, viaje)
      .then(res => {
        alert('La edición ha sido exitosa');
        this.loadViajes();
        this.cargarViajeAEditar();
        this.toggleEdit();
      });
  }

  deleteViaje() {
    let viaje_index = (<HTMLInputElement>document.getElementById("select")).value;
    this.viajesService.deleteViajes(this.viajes[Number(viaje_index)].id).then(res => {
      alert('Se ha borrado con exito');
      this.loadViajes();
      this.toggleEdit();
    });
  }
}
