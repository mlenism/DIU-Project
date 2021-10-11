import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { HomeService } from '../../services/home.service';
import { TokenService } from '../../services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public info: any;
  public user: SocialUser;
  public loggedIn: boolean;
  public formu: FormGroup;
  public last_change_time: string;
  private sendInfoTimeOut = setTimeout(()=>0,0);
  private tx = document.getElementsByClassName("text-area-we-info-footer") as HTMLCollectionOf<HTMLElement>;

  constructor(
    private homeService: HomeService,
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    this.info = {contact: ''};
    this.last_change_time = '';
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.getContact();
    })
  }

  private initForm() {
    this.formu = this.formBuilder.group({
      contact: [this.info.contact, [Validators.required]]
    })
  }

  private getContact() {
    this.homeService.getFullInfo().subscribe(
      res => {
        this.info = res;
        if (this.loggedIn) {
          this.initForm();
          this.resizeTextArea();
        }
      },
      err => console.error(err)
    )
  }

  private resizeTextArea() {
    setTimeout(() => {
      for (let i = 0; i < this.tx.length; i++) {
        this.onInputText(this.tx[i]);
      }
    }, 0);
  }

  public onInputText(e: any) {
    e.style.height = "0px";
    e.style.height = (e.scrollHeight) + "px";
  }

  public sendInfo(e: any) {
    this.last_change_time = `Guardando cambios...`;
    clearTimeout(this.sendInfoTimeOut);
    this.sendInfoTimeOut = setTimeout(() => {
      this.homeService.putInfoFooter(this.formu.value).subscribe(
        res => {
          this.last_change_time = `Último cambio: ${JSON.parse(res)}`;
          setTimeout(() => {
            this.last_change_time = '';
          }, 10000);
        },
        err => console.error(err)
      )
    }, 3100);
  }
}
