import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  private milliseconds: number = 9000;
  private slideIndex: number = 0;
  private repeat = setTimeout(()=>0,0);

  constructor() {
  }

  ngOnInit(): void {
    this.showSlides();
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
}