import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null && this.tokenService.getToken() != null);
    })
  }

  signOut(): void {
    this.authService.signOut().then((data) => {
      this.tokenService.logOut();
      this.loggedIn = false;
    });
  }
}
