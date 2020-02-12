import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  collapse: boolean;

  constructor() { }

  ngOnInit() {
    this.collapse = true;
    // Seteo Home como nav activo
    document.getElementById('nav1').classList.add("active");
  }

  change_active_nav(event: any) {
    let id = event.currentTarget.attributes.id.nodeValue;

    let elems = document.getElementsByClassName("nav-item");

    // Quito la clase active de todos los elementos del navbar
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove("active");
    }

    // Agrego clase activa al elemento clickeado

    if (id === 'nav0') {
      // Si clickie el nav-logo marco como activo el nav Home
      document.getElementById('nav1').classList.add("active");
    }
    else {
      document.getElementById(id).classList.add("active");
      this.collapse = !this.collapse;
    }
  }
}
