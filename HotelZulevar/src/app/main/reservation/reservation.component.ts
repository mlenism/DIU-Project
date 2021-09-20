import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  info: any[];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private router: Router
  ) {
    this.info = [];
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group(
      {
        startDate: ['', [Validators.required]],
        finishDate: ['', [Validators.required]],
        adults: ['', [Validators.required]],
        children: ['', [Validators.required]],
      }
    );
  }

  onSubmit() {
    const {startDate, finishDate, adults, children} = this.form.value;
    this.getSomeRooms(startDate, finishDate, adults, children);
    const filter = {
      startDate: startDate,
      finishDate: finishDate,
      adults: adults,
      children: children
    }
    sessionStorage.setItem('filter', JSON.stringify(filter));
  }

  private getSomeRooms(id: string, fd: string, ad: string, ch: string) {
    this.roomsService.getPartialInfo(id, fd, ad, ch).subscribe(
      res => this.info = res,
      err => console.error(err)
    )
  }

  public confirm(name: string) {
    sessionStorage.setItem('room_name', name);
    this.router.navigate(['/reserva/confirmacion']);
  }

}