import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public info: any;
  public user: SocialUser;
  public loggedIn: boolean;
  public formu: FormGroup;
  private sendInfoTimeOut = setTimeout(()=>0,0);
  public last_change_time: string;
  private tx = document.getElementsByTagName("textarea") as HTMLCollectionOf<HTMLElement>;

  constructor(
    private homeService: HomeService,
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    this.info = {about_us: ''};
    this.last_change_time = '';
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.getAboutUs();
    })
  }

  private initForm() {
    this.formu = this.formBuilder.group({
      about: [this.info.about_us, [Validators.required]]
    })
  }

  private getAboutUs() {
    this.homeService.getFullInfo().subscribe(
      res => {
        this.info = res;
        if(this.loggedIn) {
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
      this.homeService.putInfoAbout(this.formu.value).subscribe(
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
