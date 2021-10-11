import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';
import { HomeService } from '../../services/home.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public info: any;
  public last_change_time: string;
  public user: SocialUser;
  public loggedIn: boolean;
  public cover: string;
  public about_us_cover: number | string;
  public about_us_img1: number | string;
  public about_us_img2: number | string;
  public formu: FormGroup;
  private file: File;
  private sendInfoTimeOut = setTimeout(()=>0,0);
  private tx = document.getElementsByTagName("textarea") as HTMLCollectionOf<HTMLElement>;

  constructor(
    private homeService: HomeService,
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    this.info = {mission: '', vision: '', history: ''}
    this.about_us_cover = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
    this.about_us_img1 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
    this.about_us_img2 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
    this.last_change_time = '';
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.getAboutUsInfo();
    });
    this.getAllImages();
  }

  private initForm() {
    this.formu = this.formBuilder.group({
      mission: [this.info.mission, [Validators.required]],
      vision: [this.info.vision, [Validators.required]],
      history: [this.info.history, [Validators.required]]
    })
  }


  private getAboutUsInfo() {
    return this.homeService.getFullInfo().subscribe(
      res => {
        this.info = res;
        if(this.loggedIn) {
          this.initForm();
          this.resizeTextArea();
          this.resizeTextArea();
          this.fixInput();
        }
      },
      err => console.error(err)
    )
  }

  private getAllImages() {
    this.homeService.getImg('about_us_cover').subscribe(
      res => this.about_us_cover = res,
      err => console.error(err)
    );
    this.homeService.getImg('about_us_img1').subscribe(
      res => this.about_us_img1 = res,
      err => console.error(err)
    );
    this.homeService.getImg('about_us_img2').subscribe(
      res => this.about_us_img2 = res,
      err => console.error(err)
    );
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
    this.fixInput();
  }

  public getUrl(id: number | string) {
    if (typeof id === 'number') {
      const host = `${environment.HOST_URL}/images`
      const index = Math.floor(id/100);
      return `${host}/${index}/${id}.webp`;
    } else {
      return id;
    }
  }

  public onSelectedCover(e: any) {
    const data = this.form('about_us_cover', e);
    if (data) {
      this.quitInput();
      this.about_us_cover = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
      this.homeService.putImg(data).subscribe(
        res => {
          this.about_us_cover = parseInt(res);
          this.fixInput();
        },
        err => console.error(err)
      )
    }
  }

  public onSelectedImg1(e: any) {
    const data = this.form('about_us_img1', e);
    if (data) {
      this.quitInput();
      this.about_us_img1 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
      this.homeService.putImg(data).subscribe(
        res => {
          this.about_us_img1 = parseInt(res);
          setTimeout(() => {
            this.resizeTextArea();
            this.fixInput();
          }, 1100);
        },
        err => console.error(err)
      )
    }
  }

  public onSelectedImg2(e: any) {
    const data = this.form('about_us_img2', e);
    if (data) {
      this.quitInput();
      this.about_us_img2 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
      this.homeService.putImg(data).subscribe(
        res => {
          this.about_us_img2 = parseInt(res);
          setTimeout(() => {
            this.resizeTextArea();
            this.fixInput();
          }, 1100);
        },
        err => console.error(err)
      )
    }
  }

  private form(name: string, e: any) {
    if (e.target.files && e.target.files[0]) {
      this.file = <File>e.target.files[0];
      const form = new FormData();
      form.append('name', name);
      form.append('image', this.file)
      return form;
    }
    return null;
  }

  public fixInput() {
    let row = document.getElementsByClassName("row") as HTMLCollectionOf<HTMLElement>;
    let input = document.getElementsByClassName("change-img") as HTMLCollectionOf<HTMLElement>;
    let image = document.getElementsByClassName("home-page-img") as HTMLCollectionOf<HTMLElement>;

    if (input.length !== 0 && image.length !== 0 && row.length !== 0) {
      row[0].style.width = `${image[0].clientWidth}px`;
      row[1].style.width = `${image[0].clientWidth}px`;
      for (let i = 0; i < input.length; i++) {
        const inp = input[i];
        const img = image[i];
        inp.style.height = `${img.clientHeight}px`;
        inp.style.width = `${img.clientWidth}px`;
        inp.style.top = `${img.offsetTop}px`;
        inp.style.visibility = `visible`;
      }
    }
  }

  private quitInput() {
    const input = document.getElementsByClassName("change-img") as HTMLCollectionOf<HTMLElement>;
    if (input.length !== 0) {
      for (let i = 0; i < input.length; i++) {
        const inp = input[i];
        inp.style.visibility = `hidden`;
      }
    }
  }

  public sendInfo(e: any) {
    this.last_change_time = `Guardando cambios...`;
    clearTimeout(this.sendInfoTimeOut);
    this.sendInfoTimeOut = setTimeout(() => {
      this.homeService.putInfo(this.formu.value).subscribe(
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
