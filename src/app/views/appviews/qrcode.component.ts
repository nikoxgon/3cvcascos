import { Component, OnInit } from '@angular/core';
import { HomologacionService } from '../homologacion/homologacion.service';
import { Homologacion } from '../homologacion/homologacion';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'qrcode',
  templateUrl: 'qrcode.template.html'
})
export class QRCodeComponent implements OnInit{

  private hom:Homologacion = new Homologacion();

  constructor(private homologacionService:HomologacionService, private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit():void {
    this.homologacionService.getServiceUrlFromNode().subscribe(url => {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id)
        {
          this.homologacionService.getCasco(id, url+'api/consulta/casco').subscribe((hom) => 
          {
            this.hom=hom;
            console.log(this.hom);
            if(this.hom.homAcreditacion == null)
            {
              swal({
                title: '<h1>Error al consultar la información solicitada</h1>',
                imageAlt: 'Error'
              }).then((result) => 
              {
                if (result.value) 
                {
                  this.router.navigate(['/homologacion/search']);
                }
              })
            }
          })
        }
      })
    });
  }
 }
