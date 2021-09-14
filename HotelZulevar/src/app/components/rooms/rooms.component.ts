import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  info: any[];

  constructor(private roomsService: RoomsService) {
    this.info = [];
  }

  ngOnInit(): void {
    this.getRooms();
  }

  private getRooms() {
    this.roomsService.getFullInfo().subscribe(
      res => this.info = res,
      err => console.error(err)
    )
  }

}
