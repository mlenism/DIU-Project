import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { RoomsService } from 'src/app/services/rooms.service';
import { TouristPacksService } from 'src/app/services/tourist-packs.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from '../../../../environments/environment';
import { ReserveInfo } from '../../../models/reserve-info';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit {

  public infoRooms: any[];
  public infoPacks: any[];
  public formu: FormGroup;
  public user: SocialUser;
  public reserveInfo: ReserveInfo;
  public loggedIn: boolean;
  public last_change_time: string;

  constructor(
    private formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private router: Router,
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private touristPacksService: TouristPacksService
  ) {
    this.infoRooms = [];
    this.infoPacks = [];
    this.last_change_time = '';
    this.reserveInfo = {
      packUUID: null,
      roomUUID: '',
      pack: '',
      roomName: '',
      dateIn: '',
      dateOut: '',
      adults: 0,
      children: 0,
      cost: 0
    }
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.initForm();
    this.getPacks();
  }

  private initForm() {
    this.formu = this.formBuilder.group(
      {
        startDate: ['', [Validators.required]],
        finishDate: ['', [Validators.required]],
        adults: ['', [Validators.required]],
        children: ['', [Validators.required]],
      }
    );
  }

  private getPacks() {
    this.touristPacksService.getFullInfo().subscribe(
      res => {
        const array = res as any[];
        let new_array = [];
        for (let i = 0; i < array.length; i=i+2) {
          if ((i+1) < array.length) {
            const a = array.slice(i, i+2)
            new_array.push(a);
          } else {
            const a = array.slice(i, i+1)
            new_array.push(a);
          }
        }
        this.infoPacks = new_array;
      },
      err => console.error(err)
    )
  }

  private submit() {
    this.last_change_time = 'Buscando...';
    const {startDate, finishDate, adults, children} = this.formu.value;
    this.reserveInfo["dateIn"] = startDate;
    this.reserveInfo["dateOut"] = finishDate;
    this.reserveInfo["adults"] = parseInt(adults);
    this.reserveInfo["children"] = parseInt(children);
    this.roomsService.getPartialInfo(startDate, finishDate, adults, children).subscribe(
      res =>  {
        const array = res as any[];
        let new_array = [];
        for (let i = 0; i < array.length; i=i+2) {
          if ((i+1) < array.length) {
            const a = array.slice(i, i+2)
            new_array.push(a);
          } else {
            const a = array.slice(i, i+1)
            new_array.push(a);
          }
        }
        this.infoRooms = new_array;
        if (array.length === 0) {
          this.last_change_time = 'No se encontraron habitaciones, pruebe otra fecha';
        } else {
          this.last_change_time = `Se encontraron ${array.length} habitaciones!`;
        }
        setTimeout(() => {
          this.last_change_time = '';
        }, 9000);
      },
      err => console.error(err)
    )
  }

  public checkForm() {
    if (this.formu.valid) {
      this.submit();
    }
  }

  public onSelectRoom(e: any, b: any) {
    this.restoreAllRoomsStyle('div-card-pack', 'card-pack-text');
    if (this.reserveInfo.roomUUID === b.uuid) {
      this.reserveInfo["roomName"] = '';
      this.reserveInfo["roomUUID"] = '';
      this.reserveInfo["cost"] = 0;
    } else {
      this.reserveInfo["roomName"] = b.name;
      this.reserveInfo["roomUUID"] = b.uuid;
      this.reserveInfo["cost"] = parseInt(b.cost);
      this.changeStyle(e);
    }
  }

  public onSelectPack(e: any, b: any) {
    this.restoreAllRoomsStyle('div-card-tourist-pack', 'card-packs-text');
    if (this.reserveInfo.packUUID === b.uuid) {
      this.reserveInfo["pack"] = '';
      this.reserveInfo["packUUID"] = null;
    } else {
      this.reserveInfo["pack"] = b.name;
      this.reserveInfo["packUUID"] = b.uuid;
      this.changeStyle(e);
    }
  }

  private changeStyle(e: any) {
    let card = e.target as HTMLElement;
    let textcard = e.target.children[1] as HTMLElement;
    if (card.className === "card-pack-text" || card.className === "card-packs-text" ) {
      textcard = card;
      card = e.path[1] as HTMLElement;
    } else if (card.className === "home-page-img") {
      card = e.path[2] as HTMLElement;
      textcard = e.target.parentNode.parentNode.children[1] as HTMLElement;
    }
    card.style.backgroundColor = "#003f63";
    textcard.style.color = "white";
  }

  public restoreAllRoomsStyle(card: string, text: string) {
    const input = document.getElementsByClassName(card) as HTMLCollectionOf<HTMLElement>;
    const Cardstext = document.getElementsByClassName(text) as HTMLCollectionOf<HTMLElement>;
    if (input.length !== 0) {
      for (let i = 0; i < input.length; i++) {
        const inp = input[i];
        inp.style.backgroundColor = '#c4c4c4';
      }
    }
    for (let i = 0; i < Cardstext.length; i++) {
      const e = Cardstext[i];
      e.style.color = '#505050';
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

  public isReservationValid() {
    const nm = this.reserveInfo.roomName !== '';
    const dIn = this.reserveInfo.dateIn !== '';
    const dOu = this.reserveInfo.dateOut !== '';
    const adl = this.reserveInfo.adults !== 0;
    const chl = this.reserveInfo.adults !== 0;
    const uuid = this.reserveInfo.roomUUID !== '';
    return nm && dIn && dOu && adl && chl && uuid;
  }

  public saveData() {
    sessionStorage.setItem('reservation', JSON.stringify(this.reserveInfo));
    this.router.navigate(['/reserva/confirmacion']);
  }
}