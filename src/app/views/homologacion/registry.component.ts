// Import library

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Homologacion } from './homologacion'
import { Solicitante } from './solicitante';
import { HomologacionService } from './homologacion.service'

import mergeImages from 'merge-images';
import swal from 'sweetalert2';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { LoginService } from "../appviews/login.service";

declare var jQuery:any;

@Component({
  selector: 'registry',
  templateUrl: 'registry.template.html'
  })

export class RegistryComponent implements OnInit {
  qrImage:string;
  qrImageMerged:string;
  qrText:string;
  //urlPub = 'http://190.151.54.74:3001/#/qrcode/';
  urlPub = '';
  private homologacion: Homologacion = new Homologacion();
  private solicitantes: Solicitante[];
  private titulo:string = "Crear casco";
  private solRut: string;
  private cascoSrc :any;
  data: any;
  cropperSettings: CropperSettings;
  cargoImagen:any;
  public logged: Boolean;

  constructor (
    private homologacionService: HomologacionService,
    private router: Router,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute ) {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 250;
      this.cropperSettings.height = 200;
      this.cropperSettings.croppedWidth = 250;
      this.cropperSettings.croppedHeight = 200;
      this.cropperSettings.canvasWidth = 250;
      this.cropperSettings.canvasHeight = 200;
      this.data = {};
      }

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
	  this.homologacionService.getSolicitantes().subscribe(
      solicitantes => this.solicitantes = solicitantes
    );
    this.homologacionService.getQrUrl().subscribe(
      url => {
        this.urlPub = url;
        console.log('url qr: '+ this.urlPub);
      }
    );
  }
  
  public guardarHomologacion() 
  {
    let cascoSrc = (<HTMLImageElement>document.getElementById("casco")).src.split('/')[(<HTMLImageElement>document.getElementById("casco")).src.split('/').length-1];
    if(this.solRut == undefined || this.qrImage == undefined || this.qrImageMerged == undefined || this.homologacion.casMarca == undefined ||
      this.homologacion.casModelo == undefined || this.homologacion.casOrigen == undefined || this.homologacion.casLote == undefined ||
      this.homologacion.casFabricante == undefined || this.homologacion.homAcreditacion == undefined || this.solRut == "" || this.qrImage == "" || 
      this.qrImageMerged == "" || this.homologacion.casMarca == "" ||
      this.homologacion.casModelo == "" || this.homologacion.casOrigen == "" || this.homologacion.casLote == "" ||
      this.homologacion.casFabricante == "" || this.homologacion.homAcreditacion == "" || cascoSrc == 'default.png')
    {
      swal({
        title: '<strong>Datos incompletos</strong>',
        imageAlt: 'QR',
        html: '<h3>Favor de completar todos los campos.</h3>'
      })
    }
    else
    {
      this.homologacion.solRut = this.solRut;
      this.homologacion.homQrcode1 = this.qrImage;
      this.homologacion.homQrcode2 = this.qrImageMerged;
      this.homologacion.casImagen1 = (<HTMLImageElement>document.getElementById("casco")).src;

      if ( this.homologacion.homQrcode1 != undefined &&
        this.homologacion.homQrcode2 != undefined &&
        this.homologacion.casImagen1 != undefined ) {
        //  console.log(this.homologacion);
        this.homologacionService.guardarHomologacion(this.homologacion).subscribe (
          homologacion => {
            swal({
              title: '<strong>Homologación registrada Ok</strong>',
              imageAlt: 'QR',
              html: '<p>Para descargar el código da clic en la imagen.</p>' +
                '<a href ="' + homologacion.homQrcode1 + '" download="' + homologacion.homAcreditacion + '"><img src="' + homologacion.homQrcode1 + '" width="64" border="0"></a>' +
                '<a href ="' + homologacion.homQrcode2 + '" download="' + homologacion.homAcreditacion + '"><img src="' + homologacion.homQrcode2 + '" width="64" border="0"></a>'
            }).then(() => (
                this.router.navigate(['/homologacion/search']) )
            )
            //this.router.navigate(['/homologacion/search'])
          }
        );
      }
    }
  }
  
  getImage(): void {
    this.qrImage = document.getElementById("qrCode").children[0].children[0].children[0].getAttribute("src");
    var canvas = <HTMLCanvasElement> document.getElementById("textCanvas");
    var tCtx = canvas.getContext("2d");
    tCtx.canvas.width = tCtx.measureText('Código de acreditación '+this.homologacion.homAcreditacion).width;

    tCtx.font = "12px Helvetica";
    tCtx.textAlign = "center"; 
    tCtx.fillText('Código de acreditación', 70, 10);

    tCtx.textAlign = "center";
    tCtx.font = "12px Helvetica";
    tCtx.fillText(this.homologacion.homAcreditacion, 70, 25);
    this.qrText = tCtx.canvas.toDataURL();

    var canvasQr = <HTMLCanvasElement> document.getElementById("canvasQr");
    var tCtxQr = canvasQr.getContext("2d");
    canvasQr.width = 220;
    canvasQr.height = 220;
    var image = new Image();
    image.src = this.qrImage;
    tCtxQr.drawImage(image, 0, 0, 220, 220);
    this.qrImage = canvasQr.toDataURL('image/png');
    mergeImages([
      { src:'/assets/images/Picture2_sm.png', x:0, y:0 },
      { src:this.qrImage, x:115, y:80 },
      { src:this.qrText, x:150, y:290 }
    ],{
      width: 512,
      height: 512
    })
    .then( b64 => {
      var canvasQr = <HTMLCanvasElement> document.getElementById("canvasQrM");
      var tCtxQr = canvasQr.getContext("2d");
      canvasQr.width = 800;
      canvasQr.height = 800;
      var image = new Image();
      image.src = b64;
      image.onload = () =>
      {
        tCtxQr.drawImage(image, 50, 100, 800, 800);
        tCtxQr.fillStyle = 'rgba(255, 0, 0, 0.5)';
        
        this.qrImageMerged = canvasQr.toDataURL('image/png');
        this.guardarHomologacion();
        //console.log('merge',this.qrImageMerged);
      };
    });
  }

  public readURL(event) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.cascoSrc = reader.result;
   }, false);

   if (event) {
      reader.readAsDataURL(event.target.files[0]);
   }
}

  btnClickNew = function () {
    this.router.navigate(['/homologacion/solicitante']);
  };

  btnClickCancel = function () {
    this.router.navigate(['/homologacion/search']);
  };

}
