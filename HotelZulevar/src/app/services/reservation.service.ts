import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private API_URI = `${environment.HOST_URL}/reservation`;

  constructor(private http: HttpClient) { }

  sendInfo(data: any): Observable<any> {
    return this.http.post(`${this.API_URI}`, data, {responseType: 'text'});
  }

  getInfo(): Observable<any> {
    return this.http.get(`${this.API_URI}`);
  }

  getInfoById(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  getOneInfoById(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/one/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/${id}`);
  }
}
