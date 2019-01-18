import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { Viajes } from 'src/app/models/viajes';
import { ViajesViewModel } from 'src/app/models/viajes-view-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formdb: FormGroup;

  constructor(private formBuilder: FormBuilder, private viajesService: ViajesService) {

  }

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
      foto3: ['', Validators.required]
    });
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
      lastModifiedDate: new Date()
    }

    this.viajesService.saveViajes(viaje)
      .then(() => alert("Viaje guardado con exito!"))
      .catch(err => console.error(err));
  }
}
