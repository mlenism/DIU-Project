import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeService } from './services/home.service';
import { TouristPacksService } from './services/tourist-packs.service';
import { RoomsService } from './services/rooms.service';
import { ReservationService } from './services/reservation.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { SlideComponent } from './components/slide/slide.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TouristPacksComponent } from './components/tourist-packs/tourist-packs.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PackCardComponent } from './components/pack-card/pack-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    SlideComponent,
    HomeComponent,
    AboutUsComponent,
    TouristPacksComponent,
    RoomsComponent,
    ReservationComponent,
    ConfirmComponent,
    PackCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    HomeService,
    TouristPacksService,
    RoomsService,
    ReservationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
