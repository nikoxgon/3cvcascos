import { FormsModule } from "@angular/forms";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { DataTableModule } from 'angular2-datatable';

import {SearchComponent} from "./search.component";
//import {RegistryComponent} from "./registry.component";
//import {SolicitanteComponent} from "./solicitante.component";

// Chart.js Angular 2 Directive by Valor Software (npm)
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FlotModule } from '../../components/charts/flotChart';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { JVectorMapModule } from '../../components/map/jvectorMap';

import { Ng2Rut } from 'ng2-rut';

@NgModule({
  declarations: [SearchComponent],
  imports     : [FormsModule, Ng2Rut, BrowserModule,ChartsModule, FlotModule,IboxtoolsModule,PeityModule,SparklineModule,JVectorMapModule,DataTableModule],
  exports     : [SearchComponent],
})

export class HomologacionModule {}
