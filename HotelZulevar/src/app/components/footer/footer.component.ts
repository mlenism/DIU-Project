import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  info: any;

  constructor(private homeService: HomeService) {
    this.info = {contact: ''};
  }

  ngOnInit(): void {
    this.getContact();
  }

  private getContact() {
    this.homeService.getFullInfo().subscribe(
      res => this.info = res,
      err => console.error(err)
    )
  }

}
