import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  title = 'Agencia Clásica&Moderna';
  logged: boolean = false;


  constructor(private titleService: Title, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.auth.getUser().subscribe( asd => {
      if(asd!==null){
        this.logged=true;
      }
      else{
        this.logged = false;
      }
    });

  }


}
