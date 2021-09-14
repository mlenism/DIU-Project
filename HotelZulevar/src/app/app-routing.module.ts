import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TouristPacksComponent } from './components/tourist-packs/tourist-packs.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ConfirmComponent } from './components/confirm/confirm.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'nosotros',
    component: AboutUsComponent
  },
  {
    path: 'paquetes',
    component: TouristPacksComponent
  },
  {
    path: 'habitaciones',
    component: RoomsComponent
  },
  {
    path: 'reserva',
    component: ReservationComponent
  },
  {
    path: 'reserva/confirmacion',
    component: ConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
