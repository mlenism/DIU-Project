import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialUser, SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { OauthService } from '../../services/oauth.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private tokenService: TokenService,
    private oauthService: OauthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null && this.tokenService.getToken() != null);
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.tokenService.setToken(data.idToken)
      this.router.navigate(['']);
    }).catch(err => console.log(err));
  }
}