import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReserveInfo } from '../../../models/reserve-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  info: ReserveInfo;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getInfo();
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        tel: ['', [Validators.required]],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
      }
    );
  }

  onSubmit() {
    this.sendInfo();
  }

  private getInfo() {
    const storage = sessionStorage.getItem('reservation');
    if (typeof(storage) === 'string') {
      this.info = JSON.parse(storage) as ReserveInfo;
    }
  }

  private sendInfo() {
    const data = {
      form: this.form.value,
      info: this.info
    }
    this.reservationService.sendInfo(data).subscribe(
      res => {
        alert("Se ha hecho la reserva, revise su correo");
        this.router.navigate(['/']);
      },
      err => console.error(err)
    )
  }
}
