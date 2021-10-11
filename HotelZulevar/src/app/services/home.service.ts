import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private API_URI = `${environment.HOST_URL}/home`;

  constructor(private http: HttpClient) { }

  getFullInfo(): Observable<any> {
    return this.http.get(`${this.API_URI}`);
  }

  getImg(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  putImg(data: any): Observable<any> {
    return this.http.put(`${this.API_URI}`, data, {responseType: 'text'});
  }

  putInfo(data: any): Observable<any> {
    return this.http.post(`${this.API_URI}`, data, {responseType: 'text'});
  }

  putInfoFooter(data: any): Observable<any> {
    return this.http.post(`${this.API_URI}/footer`, data, {responseType: 'text'});
  }

  putInfoAbout(data: any): Observable<any> {
    return this.http.post(`${this.API_URI}/about`, data, {responseType: 'text'});
  }
}