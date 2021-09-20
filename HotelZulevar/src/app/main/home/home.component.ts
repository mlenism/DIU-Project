import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public info: any;
  public user: SocialUser;
  public loggedIn: boolean;
  private tx = document.getElementsByTagName("textarea") as HTMLCollectionOf<HTMLElement>;

  constructor(
    private homeService: HomeService,
    private authService: SocialAuthService,
    private tokenService: TokenService
  ) {
    this.info = {about_us: ''};
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null && this.tokenService.getToken() != null);
      this.getAboutUs();
    })
  }

  private getAboutUs() {
    this.homeService.getFullInfo().subscribe(
      res => {
        this.info = res;
        if(this.loggedIn) {
          setTimeout(this.resizeTextArea.bind(this), 0);
        }
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
