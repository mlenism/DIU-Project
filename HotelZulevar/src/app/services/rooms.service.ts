import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private API_URI = `${environment.HOST_URL}/room`;

  constructor(private http: HttpClient) { }

  getFullInfo(): Observable<any> {
    return this.http.get(`${this.API_URI}`);
  }

  getPartialInfo(id: string, fd: string, ad: string, ch: string): Observable<any> {
    return this.http.get(`${this.API_URI}/some?id=${id}&fd=${fd}&ad=${ad}&ch=${ch}`);
  }

  getInfoById(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/${id}`);
  }
}