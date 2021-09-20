import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private API_URI = `${environment.HOST_URL}/oauth`;

  constructor(private http: HttpClient) { }

  public google(tokenDto: any): Observable<any> {
    return this.http.post<any>(`${this.API_URI}`, tokenDto, header);
  }
}