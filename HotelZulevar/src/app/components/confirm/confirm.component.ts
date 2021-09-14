import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service'
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  info: any;
  plan: any;
  room: any
  filter: any;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private reservationService: ReservationService) {
    this.info = {
      name: '',
      description: '',
      cost: 0,
      adults: 0,
      children: 0,
      season: '',
      image: '',
      start_date: '',
      finish_date: ''
    }
  }

  ngOnInit(): void {
    this.room = localStorage.getItem('room_name');
    if (typeof(this.room) === 'string') {
      this.getRoom(this.room);
    }
    this.initForm();
    this.plan = localStorage.getItem('plan');
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

  private getRoom(id: string) {
    this.roomsService.getInfoById(id).subscribe(
      res => {
        this.info = res;
        const storage = localStorage.getItem('filter');
        if (typeof(storage) === 'string') {
          this.filter = JSON.parse(storage);
          this.info["start_date"] = this.filter.startDate;
          this.info["finish_date"] = this.filter.finishDate;
          this.info["adults"] = this.filter.adults;
          this.info["children"] = this.filter.children;
        }
      },
      err => console.error(err)
    )
  }

  private sendInfo() {
    const data = {
      form: this.form.value,
      filter: this.filter,
      plan: this.plan,
      room: this.room
    }
    this.reservationService.sendInfo(data).subscribe(
      res => {
        alert("Se ha hecho la reserva");
      },
      err => console.error(err)
    )
  }


}
