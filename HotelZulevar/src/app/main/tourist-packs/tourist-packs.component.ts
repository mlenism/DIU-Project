import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TouristPacksService } from '../../services/tourist-packs.service';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourist-packs',
  templateUrl: './tourist-packs.component.html',
  styleUrls: ['./tourist-packs.component.css']
})
export class TouristPacksComponent implements OnInit {

  public info: any[];
  public user: SocialUser;
  public loggedIn: boolean;
  private tx = document.getElementsByTagName("textarea") as HTMLCollectionOf<HTMLElement>;

  @ViewChildren('cards') cards: QueryList < any > ;

  constructor(
    private touristPacksService: TouristPacksService,
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.info = [];
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null && this.tokenService.getToken() != null);
      this.getPacks();
    });
  }

  private ngAfterViewInit() {
    this.cards.changes.subscribe(t => {
      this.ngForRendered();
    })
  }

  private ngForRendered() {
    if (this.loggedIn) {
      this.resizeTextArea();
    }
  }

  private getPacks() {
    this.touristPacksService.getFullInfo().subscribe(
      res => this.info = res,
      err => console.error(err)
    )
  }

  public confirm(name: string) {
    sessionStorage.setItem('plan', name);
    this.router.navigate(['/reserva']);
    alert(`Se a agregado el plan: ${name}`)
  }

  private resizeTextArea() {
    for (let i = 0; i < this.tx.length; i++) {
      this.tx[i].style.height = "0px";
      this.tx[i].style.height = (this.tx[i].scrollHeight) + "px";
    }
  }

  @HostListener('window:resize')
  @HostListener('input')
  private handleWindow() {
    this.resizeTextArea();
  }
}
