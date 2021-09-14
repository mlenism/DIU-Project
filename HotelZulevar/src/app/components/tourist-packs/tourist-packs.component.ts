import { Component, OnInit } from '@angular/core';
import { TouristPacksService } from '../../services/tourist-packs.service';

@Component({
  selector: 'app-tourist-packs',
  templateUrl: './tourist-packs.component.html',
  styleUrls: ['./tourist-packs.component.css']
})
export class TouristPacksComponent implements OnInit {

  info: any[];

  constructor(private touristPacksService: TouristPacksService) {
    this.info = [];
  }

  ngOnInit(): void {
    this.getPacks();
  }

  private getPacks() {
    this.touristPacksService.getFullInfo().subscribe(
      res => this.info = res,
      err => console.error(err)
    )
  }

}
