import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { VideoComponent } from './elements/video/video.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './elements/form/form.component';
import { SeleccionViajesComponent } from './elements/seleccion-viajes/seleccion-viajes.component';
import { ContactComponent } from './elements/contact/contact.component';
import { ViajeSeleccionadoComponent } from './elements/viaje-seleccionado/viaje-seleccionado.component';
import { AboutComponent } from './elements/about/about.component';

import { ProgramasComponent } from './elements/programas/programas.component';
import { CircuitosEuropeosComponent } from './elements/circuitos-europeos/circuitos-europeos.component';

import { SearchPipe } from './elements/programas/search.pipe';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './elements/login/login.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VideoComponent,
    FormComponent,
    SeleccionViajesComponent,
    ContactComponent,
    ViajeSeleccionadoComponent,
    AboutComponent,
    ProgramasComponent,
    CircuitosEuropeosComponent,
    SearchPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
