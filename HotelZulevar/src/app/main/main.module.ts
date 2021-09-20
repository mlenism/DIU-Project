import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Service modules
import { HomeService } from '../services/home.service';
import { TouristPacksService } from '../services/tourist-packs.service';
import { RoomsService } from '../services/rooms.service';
import { ReservationService } from '../services/reservation.service';

import { MainRoutingModule } from './main-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SlideComponent } from './slide/slide.component';
import { TouristPacksComponent } from './tourist-packs/tourist-packs.component';
import { MainComponent } from './main.component';
import { InputListenerDirective } from '../directives/input-listener.directive';

@NgModule({
  declarations: [
    AboutUsComponent,
    ConfirmComponent,
    FooterComponent,
    HomeComponent,
    NavigationComponent,
    ReservationComponent,
    RoomsComponent,
    SlideComponent,
    TouristPacksComponent,
    MainComponent,
    InputListenerDirective
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeService,
    TouristPacksService,
    RoomsService,
    ReservationService
  ]
})
export class MainModule { }
