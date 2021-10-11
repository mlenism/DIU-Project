import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmComponent } from './confirm/confirm.component';
import { DetailsComponent } from './details/details.component';
import { SeeComponent } from './see/see.component'
import { MainComponent } from '../main.component'
import { OneComponent } from './one/one.component'
import { OauthGuard } from '../../guards/oauth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: SeeComponent
      },
      {
        path: 'details',
        canActivate: [OauthGuard],
        component: DetailsComponent
      },
      {
        path: 'one',
        canActivate: [OauthGuard],
        component: OneComponent
      },
      {
        path: 'ver',
        component: SeeComponent
      },
      {
        path: 'confirmacion',
        component: ConfirmComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveRoutingModule { }
