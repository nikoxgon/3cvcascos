import { Injectable, OnInit } from '@angular/core';
import { SolicitanteReg } from './solicitanteReg';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SolicitanteService{
	
  //private urlEndPointGuardaSol: string = 'http://localhost:3002/api/solicitantes/guardarSolicitante';
  private urlEndPointNode: string = '/service/getUrl';
  private urlEndPointGuardaSol: string = '';
  private url:string = '';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  guardarSolicitante(solicitanteReg: SolicitanteReg) : Observable<SolicitanteReg> {
    return this.http.post<SolicitanteReg>(this.urlEndPointGuardaSol, solicitanteReg, {headers: this.httpHeaders})
  }

  getServiceUrl()
  {
    this.getServiceUrlFromNode().subscribe(url => 
    {
      this.url=url;
      this.urlEndPointGuardaSol = this.url+'api/solicitantes/guardarSolicitante';
    });
  }

  getServiceUrlFromNode(): Observable<string>{
    return this.http
      .get(this.urlEndPointNode, {responseType: 'text'})
      .pipe(map(response => response as string));
  }

}
