import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;

  constructor(private homeService: HomeService) {
    this.info = {about_us: ''};
  }

  ngOnInit(): void {
    this.getAboutUs();
  }

  private getAboutUs() {
    this.homeService.getFullInfo().subscribe(
      res => this.info = res,
      err => console.error(err)
    )
  }

}
