import { Component, OnInit, QueryList, ViewChildren, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  public info: any[];
  public user: SocialUser;
  public loggedIn: boolean;
  public createV: boolean;
  public form: FormGroup;
  private tx = document.getElementsByTagName("textarea") as HTMLCollectionOf<HTMLElement>;

  @ViewChildren('cards') cards: QueryList < any > ;

  constructor(
    private roomsService: RoomsService,
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.info = [];
    this.createV = false;
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null && this.tokenService.getToken() != null);
      this.getRooms();
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }

  public addItem() {
    const items = this.form.get('items') as FormArray;
    items.push(this.createItem('',0,1,0,'',''));
    for (let i = (items.length - 1); i >= 0; i--) {
      if (i === 0) {
        items.at(i).patchValue({
          name: '',
          cost: 0,
          adults: 1,
          children: 0,
          description: 'descripción',
          image: ''
        });
      } else {
        const v = items.at(i-1).value;
        items.at(i).patchValue({
          name: v.name,
          cost: v.cost,
          adults: v.adults,
          children: v.children,
          description: v.description,
          image: v.image
        });
      }
    }
  }

  private remove(i: number) {
    const items = this.form.get('items') as FormArray;
    for (let k = i; k < items.length; k++) {
      if (k+1 === items.length) {
        items.removeAt(k);
      } else {
        const v = items.at(k+1).value;
        items.at(k).patchValue({
          name: v.name,
          cost: v.cost,
          adults: v.adults,
          children: v.children,
          description: v.description,
          image: v.image
        });
      }
    }
  }

  public delete(i: number) {
    const items = this.form.get('items') as FormArray;
    const n = items.at(i).value;
    const isVoid = n.description === "" && n.image === "" && n.name === "" &&  n.cost === 0;
    if (!isVoid) {
      const msg = (n.name === "") ? "¿Confirma que desea borrar la habitación?" : `Confirma que desea borrar la habitación: ${n.name}?`;
      const rslt = confirm(msg);
      if (rslt) {
        this.remove(i);
      }
    } else {
      this.remove(i);
    }
    console.log(i);
  }

  public confirm(name: string) {
    sessionStorage.setItem('room', name);
    this.router.navigate(['/reserva']);
  }

  public onInputText(e: any) {
    e.style.height = "0px";
    e.style.height = (e.scrollHeight) + "px";
  }

  public restartText(e: any) {
    e.value = e.value.charAt(e.value.length - 1);
  }

  public fillForm(f: any, e: any) {
    console.log(f)
  }

  public fillForm2(f: any, e: any) {
    console.log(f);
    console.log(e)
  }

  private ngAfterViewInit() {
    this.cards.changes.subscribe(t => {
      if (this.loggedIn) {
        this.resizeTextArea();
      }
    })
  }

  private getRooms() {
    this.roomsService.getFullInfo().subscribe(
      res => {
        this.info = res;
        this.initForm();
        this.addItemsToForm();
      },
      err => console.error(err)
    )
  }

  private resizeTextArea() {
    for (let i = 0; i < this.tx.length; i++) {
      this.onInputText(this.tx[i]);
    }
  }

  private addItemsToForm(){
    const items = this.form.get('items') as FormArray;
    for (let i = 0; i < this.info.length; i++) {
      const { name, cost, adults, children, description, image } = this.info[i];
      const c = this.createItem(name, cost, adults, children, description, image);
      items.push(c);
    }
  }

  private createItem(name: string, cost: number, adults: number, children: number, description: string, image: string): FormGroup {
    return this.formBuilder.group(
      {
        name: [name, [Validators.required]],
        cost: [cost, [Validators.required]],
        adults: [adults, [Validators.required]],
        children: [children, [Validators.required]],
        description: [description, [Validators.required]],
        image: [image, [Validators.required]],
      }
    )
  }

  public trackByIndex(index: number){
    return index;
  }
}
