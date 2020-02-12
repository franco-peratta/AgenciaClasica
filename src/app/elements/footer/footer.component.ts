import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router) { }

  openFacebook(){
    window.open("https://www.facebook.com/agenciaclasica/", "_blank"); 
  }

  openInstagram(){
    window.open("https://www.instagram.com/Agenciaclasicaymoderna/", "_blank"); 
  }

  openTwitter(){
    window.open("", "_blank"); 
  }

  openGithub(){
    window.open("https://github.com/franco-peratta/", "_blank"); 
  }

  openContact(){
    this.router.navigate(['/contacto']);
    window.scroll(0, 0);
  }
}