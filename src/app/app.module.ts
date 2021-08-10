import { HomologacionService } from './views/homologacion/homologacion.service';
import { LoginService } from './views/appviews/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { RegistryComponent } from './views/homologacion/registry.component';
import { EditComponent } from './views/homologacion/edit.component';
import {SolicitanteComponent} from "./views/homologacion/solicitante.component";
import { SolicitanteService } from './views/homologacion/solicitante.service';
import {ImageCropperComponent} from 'ng2-img-cropper';
import { NgxSoapModule } from 'ngx-soap';
//import { DataTableModule } from 'angular2-datatable';

import { Ng2Rut } from 'ng2-rut';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';

// App views
import {HomologacionModule} from "./views/homologacion/homologacion.module";
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";
import {LoginComponent} from "./views/appviews/login.component";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";

@NgModule({
  declarations: [
    AppComponent,
    RegistryComponent,
    EditComponent,
    SolicitanteComponent,
    LoginComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    Ng2Rut,
    FormsModule,
    HttpModule,
    HomologacionModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    HttpClientModule,
    NgxQRCodeModule,
    NgxSoapModule,
    //DataTableModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},HomologacionService,SolicitanteService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }