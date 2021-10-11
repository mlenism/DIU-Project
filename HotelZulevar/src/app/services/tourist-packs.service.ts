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

  createPlan(): Observable<any> {
    return this.http.get(`${this.API_URI}/n/e/w`);
  }

  putInfoImg(data: any): Observable<any> {
    return this.http.put(`${this.API_URI}/img`, data, {responseType: 'text'});
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  putInfo(data: any): Observable<any> {
    return this.http.post(`${this.API_URI}`, data, {responseType: 'text'});
  }
}
