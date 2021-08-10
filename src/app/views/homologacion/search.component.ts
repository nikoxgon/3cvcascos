
// Import library

import { Component, OnInit } from "@angular/core";
import { Homologacion, IHomologacion } from "./homologacion";
import { HomologacionService } from "./homologacion.service";
import { Router } from "@angular/router";
import { LoginService } from "../appviews/login.service";

import * as moment from "moment";

//import { validate, clean, format } from 'rut.js'

declare var jQuery: any;

@Component({
  selector: "search",
  templateUrl: "search.template.html"
})

export class SearchComponent implements OnInit {
  homologaciones: Homologacion[];
  params: IHomologacion = {
    casFabricante: null,
    casMarca: null,
    casModelo: null,
    homAcreditacion: null,
    homFecha1: null,
    homFecha2: null,
    solRut: null
  };

  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "homFecha";
  public sortOrder = "asc";
  private hom:Homologacion = new Homologacion();
  public logged: Boolean;

  constructor(private homologacionService: HomologacionService, private loginService: LoginService, private router:Router) {}

  ngOnInit() {
    this.loginService.getServiceUrl();
    this.homologacionService.getServiceUrl();
    this.loginService.checkSession().subscribe(logged => {this.logged = logged;
      console.log('logged: '+logged);
      if(!logged)
      {
        this.router.navigate(['/login']);
      }
    });
  }

  btnClickNueva = function () {
    this.router.navigate(['/homologacion/registry']);
  };

  editar(event): void
  {
    let id:string = event.target.attributes.id.value;
    console.log(id);
    this.router.navigate(['/homologacion/editar',{ac:id}]);
    /*this.homologacionService.getCasco(id).subscribe((hom) => {
      this.hom=hom;
      console.log(this.hom);
    })*/
  }

  changeParams(): void {
    let params: any = {};

    Object.keys(this.params).forEach(key => {
      if (!!this.params[key]) {
        params[key] = this.params[key];
      }
    });

    if ("homFecha1" in params) {
      params["homFecha1"] = moment(params["homFecha1"]).format("YYYY-MM-DD");
    }

    if ("homFecha2" in params) {
      params["homFecha2"] = moment(params["homFecha2"]).format("YYYY-MM-DD");
    }

    console.log("params", params);

    this.homologacionService
      .getHomologaciones(params)
      .subscribe(homologaciones => {
        this.homologaciones = homologaciones;
        this.data = JSON.parse(JSON.stringify(homologaciones));
        console.log("homologaciones: ", this.homologaciones);
      });
  }

  /*fnRutFormat(rut) {
    return format(rut);
  }*/

}

