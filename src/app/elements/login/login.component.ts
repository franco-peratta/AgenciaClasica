import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  mensajes = [];

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private messages: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {

    this.auth.getUser().subscribe(user => {
      if (user !== null) {
        // Estoy logueado, voy a 'admin'
        console.log("entre");
        this.router.navigate(['/admin']);
      }
    });

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logIn() {
    this.auth.login(this.form.value.email, this.form.value.password);
  }
}
