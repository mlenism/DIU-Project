import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { HomeService } from '../../services/home.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public info: any;
  public user: SocialUser;
  public loggedIn: boolean;
  private tx = document.getElementsByClassName("text-area-we-info-footer") as HTMLCollectionOf<HTMLElement>;

  constructor(
    private homeService: HomeService,
    private authService: SocialAuthService,
    private tokenService: TokenService
  ) {
    this.info = {contact: ''};
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null && this.tokenService.getToken() != null);
      this.getContact();
    })
  }

  private getContact() {
    this.homeService.getFullInfo().subscribe(
      res => {
        this.info = res;
        setTimeout(this.resizeTextArea.bind(this), 0);
      },
      err => console.error(err)
    )
  }

  private resizeTextArea() {
    for (let i = 0; i < this.tx.length; i++) {
      this.onInputText(this.tx[i]);
    }
  }

  public onInputText(e: any) {
    e.style.height = "0px";
    e.style.height = (e.scrollHeight) + "px";
  }
}
