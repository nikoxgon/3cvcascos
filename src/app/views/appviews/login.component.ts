import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { NgxSoapService, Client, ISoapMethodResponse, security } from 'ngx-soap';
import { from } from 'rxjs';
import { Http, Response} from '@angular/http';
import { LoginService } from "./login.service";
import { Permisos } from "./permisos";

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent implements OnInit{
  usuario:string;
  password:string;
  private client: Client;
  body : any;
  result : any;
  jsonResponse: any;
  xmlResponse: string;
  message: string;
  permisos:Permisos = new Permisos();

  constructor( private router:Router, private soap: NgxSoapService, private http: Http, private loginService: LoginService) {}

  ngOnInit()
  {
    this.loginService.getServiceUrl();
  }

  login():void
  {
    if(this.usuario == undefined || this.usuario == "" || this.password == undefined || this.password == "")
    {
      swal({
        title: '<strong>Datos incompletos</strong>',
        imageAlt: 'QR',
        html: '<h3>Favor de completar todos los campos.</h3>'
      })
    }
    else
    {
      let per = [{usuario:this.usuario},{password:this.password}];
      //console.log(per);
      this.loginService.login(per)
        .subscribe(permisos => {
          this.permisos = permisos;
          //console.log("permisos en subscribe",this.permisos);
          if(this.permisos.usuario != null)
          {
            this.router.navigate(['/homologacion/search']);
          }
          else
          {
            swal({
              title: '<h1>Usuario o contraseña incorrectos</h1>',
              imageAlt: 'Error',
              type: 'error'
            })
          }
        });
      //console.log("permisos",this.permisos);
    }
  }


}
