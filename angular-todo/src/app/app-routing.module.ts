import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { VideoComponent } from './elements/video/video.component';
import { SeleccionViajesComponent } from './elements/seleccion-viajes/seleccion-viajes.component';
import { FormComponent } from './elements/form/form.component';
import { ContactComponent } from './elements/contact/contact.component';
import { ViajeSeleccionadoComponent } from './elements/viaje-seleccionado/viaje-seleccionado.component';

const routes: Routes = [
  { path: "", component: SeleccionViajesComponent },
  { path: "contacto", component: ContactComponent},
  { path: "programas/:id", component: ViajeSeleccionadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
