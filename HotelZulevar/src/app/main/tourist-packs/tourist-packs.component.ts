import { Component, OnInit, QueryList, ViewChildren, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService } from "angularx-social-login";
import { TokenService } from '../../services/token.service';
import { TouristPacksService } from '../../services/tourist-packs.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tourist-packs',
  templateUrl: './tourist-packs.component.html',
  styleUrls: ['./tourist-packs.component.css']
})
export class TouristPacksComponent implements OnInit {

  public info: any[];
  public user: SocialUser;
  public loggedIn: boolean;
  public createV: boolean;
  public formu: FormGroup;
  public last_change_time: string;
  private file: File;
  private sendInfoTimeOut = setTimeout(()=>0,0);
  private tx = document.getElementsByTagName("textarea") as HTMLCollectionOf<HTMLElement>;

  @ViewChildren('cards') cards: QueryList < any > ;

  constructor(
    private touristPacksService: TouristPacksService,
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    this.info = [];
    this.createV = false;
    this.last_change_time = '';
  }

  public ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.getPacks();
    });
  }

  private initForm() {
    this.formu = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }

  public addItem() {
    const items = this.formu.get('items') as FormArray;
    this.touristPacksService.createPlan().subscribe(
      res => {
        const { uuid, name, description, image_id } = res;
        const c = this.createItem(uuid, name, description, image_id);
        items.push(c);
        for (let i = (items.length - 1); i >= 0; i--) {
          if (i === 0) {
            items.at(i).patchValue({
              uuid: uuid,
              name: name,
              description: 'descripci??n',
              image: this.getUrl(image_id)
            });
          } else {
            const v = items.at(i-1).value;
            items.at(i).patchValue({
              uuid: v.uuid,
              name: v.name,
              description: v.description,
              image: v.image
            });
          }
        }
      },
      err => console.error(err)
    )
  }

  private remove(i: number) {
    const items = this.formu.get('items') as FormArray;
    this.touristPacksService.deletePlan(items.at(i).value.uuid).subscribe(
      res => {
        if (res === '23503') {
          alert('No se puede borrar el plan debido a una falla en el servidor');
          return ;
        }
        for (let k = i; k < items.length; k++) {
          if (k+1 === items.length) {
            items.removeAt(k);
          } else {
            const v = items.at(k+1).value;
            items.at(k).patchValue({
              uuid: v.uuid,
              name: v.name,
              description: v.description,
              image: v.image
            });
          }
        }
      },
      err => console.error(err)
    )
  }

  public delete(i: number) {
    const items = this.formu.get('items') as FormArray;
    const n = items.at(i).value;
    const isVoid = n.description === "descripci??n" && n.name === "";
    if (!isVoid) {
      const msg = (n.name === "") ? "??Confirma que desea borrar el plan?" : `Confirma que desea borrar el plan: ${n.name}?`;
      const rslt = confirm(msg);
      if (rslt) {
        this.remove(i);
      }
    } else {
      this.remove(i);
    }
  }

  public onInputText(e: any) {
    e.style.height = "0px";
    e.style.height = (e.scrollHeight) + "px";
    this.fixInput();
  }

  public restartText(e: any) {
    e.value = e.value.charAt(e.value.length - 1);
  }

  private ngAfterViewInit() {
    this.cards.changes.subscribe(t => {
      if (this.loggedIn) {
        this.resizeTextArea();
      }
    })
  }

  private getPacks() {
    this.touristPacksService.getFullInfo().subscribe(
      res => {
        this.info = res;
        if (this.loggedIn) {
          this.initForm();
          this.addItemsToForm();
          setTimeout(() => {
            this.fixInput();
          }, 0);
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

  private addItemsToForm(){
    const items = this.formu.get('items') as FormArray;
    for (let i = 0; i < this.info.length; i++) {
      const { uuid, name, description, image_id } = this.info[i];
      const c = this.createItem(uuid, name, description, image_id);
      items.push(c);
    }
  }

  private createItem(uuid: string, name: string, description: string, image: number): FormGroup {
    return this.formBuilder.group(
      {
        uuid: [uuid, [Validators.required]],
        name: [name, [Validators.required]],
        description: [description, [Validators.required]],
        image: [this.getUrl(image), [Validators.required]],
      }
    )
  }

  public trackByIndex(index: number){
    return index;
  }

  public getUrl(id: number) {
    const host = `${environment.HOST_URL}/images`
    const index = Math.floor(id/100);
    return `${host}/${index}/${id}.webp`;
  }

  public onSelectedImg(e: any, form_e: any) {
    const data = this.form(form_e.uuid, e);
    if (data) {
      this.last_change_time = `Guardando cambios...`;
      this.quitInput();
      this.touristPacksService.putInfoImg(data).subscribe(
        res => {
          this.getPacks();
          this.last_change_time = `??ltimo cambio: ${JSON.parse(res)}`;
          setTimeout(() => {
            this.last_change_time = '';
          }, 10000);
        },
        err => console.error(err)
      )
    }
  }

  public fixInput() {
    let input = document.getElementsByClassName("change-img") as HTMLCollectionOf<HTMLElement>;
    let image = document.getElementsByClassName("home-page-img") as HTMLCollectionOf<HTMLElement>;

    if (input.length !== 0 && image.length !== 0) {
      for (let i = 0; i < input.length; i++) {
        const inp = input[i];
        const img = image[i];
        const font_size = Math.round(img.clientWidth/7);
        inp.style.height = `${img.clientHeight}px`;
        inp.style.width = `${img.clientWidth}px`;
        inp.style.fontSize = `${font_size}px`;
        inp.style.top = `${img.offsetTop}px`;
        inp.style.visibility = `visible`;
      }
    }
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

  public sendInfo(e: any, index: any) {
    this.last_change_time = `Guardando cambios...`;
    clearTimeout(this.sendInfoTimeOut);
    this.sendInfoTimeOut = setTimeout(() => {
      const items = this.formu.get('items') as FormArray;
      this.touristPacksService.putInfo(items.at(index).value).subscribe(
        res => {
          this.last_change_time = `??ltimo cambio: ${JSON.parse(res)}`;
          setTimeout(() => {
            this.last_change_time = '';
          }, 10000);
        },
        err => console.error(err)
      )
    }, 3100);
  }
}
