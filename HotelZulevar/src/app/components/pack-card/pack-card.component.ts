import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pack-card',
  templateUrl: './pack-card.component.html',
  styleUrls: ['./pack-card.component.css']
})
export class PackCardComponent implements OnInit {

  @Input() message: string;
  @Input() name: string;
  @Input() type: string;
  @Input() img: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  confirm(event: Event) {
    switch (this.type) {
      case 'reservation':
        localStorage.setItem('room_name', this.name);
        this.router.navigate(['/reserva/confirmacion']);
        break;

      case 'plan':
        localStorage.setItem('plan', this.name);
        this.router.navigate(['/reserva']);
        alert(`Se a agregado el plan: ${this.name}`)
        break;

      case 'room':
        localStorage.setItem('room', this.name);
        this.router.navigate(['/reserva']);
        break;
      default:
        break;
    }
  }

}
