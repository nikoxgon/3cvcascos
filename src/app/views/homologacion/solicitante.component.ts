import { Component, OnInit } from '@angular/core';
import {SolicitanteReg} from './solicitanteReg';
import {SolicitanteService} from './solicitante.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { LoginService } from "../appviews/login.service";

// Import Chart.js library
// import 'chart.js';

// import { FlotChartDirective } from '../../components/charts/flotChart';

declare var jQuery:any;

@Component({
  selector: 'solicitante',
  templateUrl: 'solicitante.template.html'
})

export class SolicitanteComponent implements OnInit {
  private solicitanteReg: SolicitanteReg = new SolicitanteReg();
  private disableRep:any;
  private disableRepExt:any;
  private esExtranjero:any;
  public logged: Boolean;

  constructor(private solicitanteService: SolicitanteService,
  private router: Router,
  private loginService: LoginService,
private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginService.getServiceUrl();
    this.solicitanteService.getServiceUrl();
    this.loginService.checkSession().subscribe(logged => {this.logged = logged;
      console.log('logged: '+logged);
      if(!logged)
      {
        this.router.navigate(['/login']);
      }
    });
	  this.solicitanteReg.solTipo = "2"
    this.esExtranjero = true;
  }
  
  public guardarSolicitante()
  {
	  if(this.esExtranjero)
	  {
		  this.solicitanteReg.repExtranjero = "1";
	  }
	  else
	  {
		  this.solicitanteReg.repExtranjero = "0";
    }
    if(this.solicitanteReg.solTipo == "1")
    {
      if(this.solicitanteReg.solNombre == undefined || this.solicitanteReg.solRut == undefined || this.solicitanteReg.solDireccion == undefined || 
        this.solicitanteReg.solRegion == undefined || this.solicitanteReg.solCiudad == undefined || this.solicitanteReg.conNombre == undefined 
        || this.solicitanteReg.conTelefono == undefined || this.solicitanteReg.conEmail == undefined || this.solicitanteReg.solNombre == "" || 
        this.solicitanteReg.solRut == "" || this.solicitanteReg.solDireccion == "" || 
        this.solicitanteReg.solRegion == "" || this.solicitanteReg.solCiudad == "" || this.solicitanteReg.conNombre == "" 
        || this.solicitanteReg.conTelefono == "" || this.solicitanteReg.conEmail == "")
      {
        swal({
          title: '<strong>Datos incompletos</strong>',
          imageAlt: 'QR',
          html: '<h3>Favor de completar todos los campos</h3>'
        })
      }
      else
      {
        this.solicitanteReg.solActivo = "1";
        this.solicitanteReg.repActivo = "0";
        this.solicitanteReg.conActivo = "1";
        this.solicitanteService.guardarSolicitante(this.solicitanteReg).subscribe(
          solicitanteReg => {this.router.navigate(['/homologacion/registry'])}
        );
      }
    }
    else if(this.solicitanteReg.solTipo == "2")
    {
      //Se valida todo el form
      if(this.solicitanteReg.repExtranjero == "1")
      {
        if(this.solicitanteReg.solNombre == undefined || this.solicitanteReg.solRut == undefined || this.solicitanteReg.solDireccion == undefined || 
          this.solicitanteReg.solRegion == undefined || this.solicitanteReg.solCiudad == undefined || this.solicitanteReg.conNombre == undefined 
          || this.solicitanteReg.conTelefono == undefined || this.solicitanteReg.conEmail == undefined || this.solicitanteReg.repNombre == undefined
          || this.solicitanteReg.repRut == undefined || this.solicitanteReg.repExtNombre == undefined || this.solicitanteReg.repExtRut == undefined
          || this.solicitanteReg.repExtDireccion == undefined || this.solicitanteReg.repExtTelefono == undefined || this.solicitanteReg.repExtEmail == undefined || 
          this.solicitanteReg.solNombre == "" || this.solicitanteReg.solRut == "" || this.solicitanteReg.solDireccion == "" || 
          this.solicitanteReg.solRegion == "" || this.solicitanteReg.solCiudad == "" || this.solicitanteReg.conNombre == "" 
          || this.solicitanteReg.conTelefono == "" || this.solicitanteReg.conEmail == "" || this.solicitanteReg.repNombre == ""
          || this.solicitanteReg.repRut == "" || this.solicitanteReg.repExtNombre == "" || this.solicitanteReg.repExtRut == ""
          || this.solicitanteReg.repExtDireccion == "" || this.solicitanteReg.repExtTelefono == "" || this.solicitanteReg.repExtEmail == "")
          {
            swal({
              title: '<strong>Datos incompletos</strong>',
              imageAlt: 'QR',
              html: '<h3>Favor de completar todos los campos.</h3>'
            })
          }
          else
          {
            this.solicitanteReg.solActivo = "1";
            this.solicitanteReg.repActivo = "1";
            this.solicitanteReg.conActivo = "1";
            this.solicitanteService.guardarSolicitante(this.solicitanteReg).subscribe(
              solicitanteReg => {this.router.navigate(['/homologacion/registry'])}
            );
          }
      }
      //Se valida solo datos de contacto, solicitante y nombre y rut de rep legal
      else
      {
        if(this.solicitanteReg.solNombre == undefined || this.solicitanteReg.solRut == undefined || this.solicitanteReg.solDireccion == undefined || 
          this.solicitanteReg.solRegion == undefined || this.solicitanteReg.solCiudad == undefined || this.solicitanteReg.conNombre == undefined 
          || this.solicitanteReg.conTelefono == undefined || this.solicitanteReg.conEmail == undefined || this.solicitanteReg.repNombre == undefined
          || this.solicitanteReg.repRut == undefined || this.solicitanteReg.solNombre == "" || this.solicitanteReg.solRut == "" || this.solicitanteReg.solDireccion == "" || 
          this.solicitanteReg.solRegion == "" || this.solicitanteReg.solCiudad == "" || this.solicitanteReg.conNombre == "" 
          || this.solicitanteReg.conTelefono == "" || this.solicitanteReg.conEmail == "" || this.solicitanteReg.repNombre == ""
          || this.solicitanteReg.repRut == "")
          {
            swal({
              title: '<strong>Datos incompletos</strong>',
              imageAlt: 'QR',
              html: '<h3>Favor de completar todos los campos.</h3>'
            })
          }
          else
          {
            this.solicitanteReg.solActivo = "1";
            this.solicitanteReg.repActivo = "1";
            this.solicitanteReg.conActivo = "1";
            this.solicitanteReg.repExtNombre = undefined;
            this.solicitanteReg.repExtRut = undefined;
            this.solicitanteReg.repExtDireccion = undefined;
            this.solicitanteReg.repExtTelefono = undefined;
            this.solicitanteReg.repExtEmail = undefined;
            this.solicitanteService.guardarSolicitante(this.solicitanteReg).subscribe(
              solicitanteReg => { this.router.navigate(['/homologacion/registry']) }
            );
          }
      }
    }
  }

  public disableRepF():void
  {
    //console.log(this.solicitanteReg.solTipo);
    if(this.solicitanteReg.solTipo == "1")
    {
      this.disableRep = true;
      this.disableRepExt = true;
      this.solicitanteReg.repNombre = undefined;
      this.solicitanteReg.repRut = undefined;
      this.solicitanteReg.repExtNombre = undefined;
      this.solicitanteReg.repExtRut = undefined;
      this.solicitanteReg.repExtDireccion = undefined;
      this.solicitanteReg.repExtTelefono = undefined;
      this.solicitanteReg.repExtEmail = undefined;
    }
    else
    {
      this.disableRep = false;
      this.disableRepExt = false;
    }
  }
  public disableRepExtF():void
  {
    //console.log(this.solicitanteReg.solTipo);
    if(!this.esExtranjero)
    {
      this.disableRepExt = true;
    }
    else
    {
      this.disableRepExt = false;
    }
  }

  btnClickCancel = function () {
    this.router.navigate(['/homologacion/registry']);
  };

}
