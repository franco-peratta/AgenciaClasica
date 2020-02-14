import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  collapse: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.collapse = true;
    this.change_active_nav();
  }

  change_active_nav(isLogo: boolean = false) {

    let elems = document.getElementsByClassName("nav-item");

    // Quito la clase active de todos los elementos del navbar
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove("active");
    }

    if (isLogo) {
      document.getElementById('nav1').classList.add("active");
      console.log("es logo");
    }
    else {
      // Obtengo url
      let url: string = window.location.pathname;
      // Marco como activo el nav correcto, dependiendo del url
      switch (url) {
        case "/": {
          document.getElementById('nav1').classList.add("active");
          console.log("home");
          break;
        }
        case "/programas": {
          document.getElementById('nav2').classList.add("active");
          console.log("programas");
          break;
        }
        case "/circuitos_europeos": {
          document.getElementById('nav3').classList.add("active");
          console.log("circuitos_europeos");
          break;
        }
        case "/about": {
          document.getElementById('nav4').classList.add("active");
          console.log("about");
          break;
        }
        case "/contacto": {
          document.getElementById('nav5').classList.add("active");
          console.log("contacto");
          break;
        }
      }
    }
  }
}
