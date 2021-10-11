import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Service modules
import { ReservationService } from '../../services/reservation.service';

import { ReserveRoutingModule } from './reserve-routing.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { SeeComponent } from './see/see.component';
import { DetailsComponent } from './details/details.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../main.module';
import { OneComponent } from './one/one.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    SeeComponent,
    DetailsComponent,
    OneComponent
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    ReactiveFormsModule,
    MainModule
  ],
  providers: [
    ReservationService
  ]
})
export class ReserveModule { }
