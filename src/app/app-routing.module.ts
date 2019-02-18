import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeleccionViajesComponent } from './elements/seleccion-viajes/seleccion-viajes.component';
import { FormComponent } from './elements/form/form.component';
import { ContactComponent } from './elements/contact/contact.component';
import { ViajeSeleccionadoComponent } from './elements/viaje-seleccionado/viaje-seleccionado.component';
import { AboutComponent } from './elements/about/about.component';
import { ProgramasComponent } from './elements/programas/programas.component';
import { CircuitosEuropeosComponent } from './elements/circuitos-europeos/circuitos-europeos.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './elements/login/login.component';

const routes: Routes = [
  { path: "", component: SeleccionViajesComponent },
  { path: "contacto", component: ContactComponent },
  { path: "programas", component: ProgramasComponent },
  { path: "programas/:id", component: ViajeSeleccionadoComponent },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "abm", component: FormComponent, canActivate: [AuthGuard] },
  { path: "circuitos_europeos", component: CircuitosEuropeosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
