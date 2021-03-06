import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TouristPacksComponent } from './tourist-packs/tourist-packs.component';
import { RoomsComponent } from './rooms/rooms.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
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
        component: RoomsComponent,
      }
    ]
  },
  {
    path: 'reserva',
    loadChildren: () => import('./reserve/reserve.module').then(m => m.ReserveModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
