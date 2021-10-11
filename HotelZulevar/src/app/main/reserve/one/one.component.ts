import { Component, OnInit } from '@angular/core';
import { ReserveInfoOne } from '../../../models/reserve-info-one';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {

  public info: ReserveInfoOne;

  constructor(private reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  private getInfo() {
    const storage = sessionStorage.getItem('one');
    if (typeof(storage) === 'string') {
      this.info = JSON.parse(storage) as ReserveInfoOne;
    }
  }

  public delete() {
    if (window.confirm(`¿Confirma que eliminará esta reserva?`)) {
      this.reservationService.delete(this.info.timestamp).subscribe(
        res => this.router.navigate(['/reserva/details']),
        err => console.error(err)
      );
    }
  }

}
