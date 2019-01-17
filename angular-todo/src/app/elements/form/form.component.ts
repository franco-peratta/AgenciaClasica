import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViajesService } from 'src/app/services/viajes-service.service';
import { Viajes } from 'src/app/models/viajes';

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
      destino: ['', Validators.required],
      duracion: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      itinerario: ['', Validators.required],
      obs: ['', null],
      foto: ['', Validators.required]
    });
  }

  saveViaje() {
    if (this.formdb.invalid) {
      return;
    }

    let viaje: Viajes = this.formdb.value;
    viaje.createdDate = new Date();
    viaje.lastModifiedDate = new Date();
    this.viajesService.saveViajes(viaje)
      .then(() => alert("Viaje guardado con exito!"))
      .catch(err => console.error(err));
  }
}
