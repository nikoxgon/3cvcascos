import { Injectable, OnInit } from "@angular/core";
import { Homologacion } from "./homologacion";
import { Solicitante } from "./solicitante";
import { Casco } from "./casco";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class HomologacionService implements OnInit{
  private urlEndPointHomologacion: string = '';
  private urlEndPointCasco: string = '';
  private urlEndPointSolicitante: string = '';
  private urlEndPointGuardaHom: string = '';
  private urlEndPointQr: string = '/qr/getUrl';
  private urlEndPointNode: string = '/service/getUrl';
  private url:string = '';

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getServiceUrl();
  }

  getHomologaciones(params: any): Observable<Homologacion[]> {
    return this.http
      .get(this.urlEndPointHomologacion, {
        params
      })
      .pipe(map(response => response as Homologacion[]));
  }

  getSolicitantes(): Observable<Solicitante[]> {
    return this.http
      .get(this.urlEndPointSolicitante)
      .pipe(map(response => response as Solicitante[]));
  }

  guardarHomologacion(homologacion: Homologacion): Observable<Homologacion> {
    return this.http.post<Homologacion>(
      this.urlEndPointGuardaHom,
      homologacion,
      { headers: this.httpHeaders }
    );
  }

  getCasco(id, url): Observable<Homologacion> {
    return this.http.get<Homologacion>(`${url}/${id}`);
  }
  
  getQrUrl(): Observable<string> {
    return this.http
      .get(this.urlEndPointQr, {responseType: 'text'})
      .pipe(map(response => response as string));
  }

  getServiceUrl()
  {
    this.getServiceUrlFromNode().subscribe(url => 
    {
      this.url=url;
      this.urlEndPointHomologacion = this.url+'api/consulta/homologaciones';
      this.urlEndPointCasco = this.url+'api/consulta/casco';
      this.urlEndPointSolicitante = this.url+'api/solicitantes';
      this.urlEndPointGuardaHom = this.url+'api/guardarHomologacion';
    });
  }

  getServiceUrlFromNode(): Observable<string>{
    return this.http
      .get(this.urlEndPointNode, {responseType: 'text'})
      .pipe(map(response => response as string));
  }

}
