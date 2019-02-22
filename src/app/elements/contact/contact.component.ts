import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Mensaje } from 'src/app/models/mensaje';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private mensajes_service: MessagesService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      mail: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

  send_message() {
    let mensaje: Mensaje = {
      mail: this.form.value.mail,
      nombre: this.form.value.nombre,
      asunto: "Contacto",
      mensaje: this.form.value.mensaje,
      createdDate: new Date(),
      leido: false,
    }
    this.mensajes_service.saveMensaje(mensaje);
    alert("Mensaje enviado con exito");
    
    //limpio los campos del formulario
    this.form.reset();
  }
}
