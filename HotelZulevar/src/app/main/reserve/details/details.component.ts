import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public info: any[];
  public formu: FormGroup;

  constructor(private reservationService: ReservationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInfo();
    this.initForm();
  }

  private getInfo() {
    this.reservationService.getInfo().subscribe(
      res => this.info = res,
      err => console.error(err)
    );
  }

  public getInfoById() {
    this.reservationService.getInfoById(this.formu.value.name).subscribe(
      res => this.info = res,
      err => console.error(err)
    );
  }

  private initForm() {
    this.formu = this.formBuilder.group({
        name: [''],
      }
    );
  }

  public seeMore(e: any) {
    this.reservationService.getOneInfoById(e.timestamp).subscribe(
      res => {
        sessionStorage.setItem('one', JSON.stringify(res));
        this.router.navigate(['/reserva/one']);
      },
      err => console.error(err)
    );
  }

}
