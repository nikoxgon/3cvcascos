import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Permisos } from "./permisos";
import { environment } from 'environments/environment';

@Injectable()
export class LoginService {
  //private urlEndPointLogin: string = 'http://190.151.54.74:3002/api/loginMtt';
  //private urlEndPointLogout: string = 'http://190.151.54.74:3002/api/logoutMtt';
  //private urlEndPointCheckSession: string = 'http://190.151.54.74:3002/api/checkSession';
  private urlEndPointLogin: string = environment.apiURL + 'loginMtt';
  private urlEndPointLogout: string = '';
  private urlEndPointCheckSession: string = environment.apiURL + 'checkSession';
  private urlEndPointNode: string = '/service/getUrl';
  private url:string = '';

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  login(persona): Observable<Permisos> {
    return this.http.post(this.urlEndPointLogin, persona,  { headers: this.httpHeaders })
      .pipe(map(response => response as Permisos));
  }

  logout(): Observable<Boolean> {
    return this.http
      .get(this.urlEndPointLogout)
      .pipe(map(response => response as Boolean));
  }

  checkSession(): Observable<Boolean> {
    return this.http
      .get(this.urlEndPointCheckSession)
      .pipe(map(response => response as Boolean));
  }

  getServiceUrl()
  {
    this.getServiceUrlFromNode().subscribe(url => 
    {
      this.url=url;
      this.urlEndPointLogin = this.url+'api/loginMtt';
      this.urlEndPointLogout = this.url+'api/logoutMtt';
      this.urlEndPointCheckSession = this.url+'api/checkSession';
    });
  }

  getServiceUrlFromNode(): Observable<string>{
    return this.http
      .get(this.urlEndPointNode, {responseType: 'text'})
      .pipe(map(response => response as string));
  }
}
