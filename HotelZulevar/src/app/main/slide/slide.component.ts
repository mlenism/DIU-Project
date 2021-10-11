import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';
import { HomeService } from '../../services/home.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  private milliseconds: number = 9000;
  private slideIndex: number = 0;
  private repeat = setTimeout(()=>0,0);
  public user: SocialUser;
  public loggedIn: boolean;
  public slide1: number | string;
  public slide2: number | string;
  public slide3: number | string;
  private file: File;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private homeService: HomeService
  ) {
    this.slide1 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
    this.slide2 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
    this.slide3 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    })
    this.showSlides();
    this.getAllImages();
  }

  showSlides() {
    let i: number;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    if (slides.length !== 0) {
      let dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      this.slideIndex++;
      if (this.slideIndex > slides.length) {this.slideIndex = 1}
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex-1].style.display = "block";
      dots[this.slideIndex-1].className += " active";
      this.repeat = setTimeout(this.showSlides.bind(this), this.milliseconds);
    }
  }

  manualSlides(n: number) {
    clearTimeout(this.repeat);
    let i: number;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
    this.repeat = setTimeout(this.showSlides.bind(this), this.milliseconds);
  }

  plusSlides(n: number) {
    this.manualSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.manualSlides(this.slideIndex = n);
  }

  private getAllImages() {
    this.homeService.getImg('slide 1').subscribe(
      res => this.slide1 = parseInt(res),
      err => console.error(err)
    );
    this.homeService.getImg('slide 2').subscribe(
      res => this.slide2 = parseInt(res),
      err => console.error(err)
    );
    this.homeService.getImg('slide 3').subscribe(
      res => this.slide3 = parseInt(res),
      err => console.error(err)
    );
  }

  public onSelectedSlide1(e: any) {
    const data = this.form('slide 1', e);
    if (data) {
      this.quitInput();
      this.slide1 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
      this.homeService.putImg(data).subscribe(
        res => {
          this.slide1 = parseInt(res);
          this.restoreInput();
        },
        err => console.error(err)
      )
    }
  }

  public onSelectedSlide2(e: any) {
    const data = this.form('slide 2', e);
    if (data) {
      this.quitInput();
      this.slide2 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
      this.homeService.putImg(data).subscribe(
        res => {
          this.slide2 = parseInt(res);
          this.restoreInput();
        },
        err => console.error(err)
      )
    }
  }

  public onSelectedSlide3(e: any) {
    const data = this.form('slide 3', e);
    if (data) {
      this.quitInput();
      this.slide3 = 'https://c.tenor.com/kjTEaH2h3e8AAAAC/loading-waiting.gif';
      this.homeService.putImg(data).subscribe(
        res => {
          this.slide3 = parseInt(res);
          this.restoreInput();
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

  private quitInput() {
    let input = document.getElementsByClassName("change-img") as HTMLCollectionOf<HTMLElement>;
    if (input.length !== 0) {
      for (let i = 0; i < input.length; i++) {
        const inp = input[i];
        inp.style.visibility = `hidden`;
      }
    }
  }

  private restoreInput() {
    let input = document.getElementsByClassName("change-img") as HTMLCollectionOf<HTMLElement>;
    if (input.length !== 0) {
      for (let i = 0; i < input.length; i++) {
        const inp = input[i];
        inp.style.visibility = `visible`;
      }
    }
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

}