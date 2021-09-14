import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  info: any;

  constructor(private homeService: HomeService) {
    this.info = {mission: '', vision: '', history: ''}
  }

  ngOnInit(): void {
    this.getAboutUsInfo();
  }

  private getAboutUsInfo() {
    this.homeService.getFullInfo().subscribe(
      res => this.info = res,
      err => console.error(err)
    )
  }

}
