import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TouristPacksService {

  private API_URI = `${environment.HOST_URL}/plan`;

  constructor(private http: HttpClient) { }

  getFullInfo(): Observable<any> {
    return this.http.get(`${this.API_URI}`);
  }
}
