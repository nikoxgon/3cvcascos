import {Routes} from "@angular/router";

import {SearchComponent} from "./views/homologacion/search.component";
import {RegistryComponent} from "./views/homologacion/registry.component";
import {SolicitanteComponent} from "./views/homologacion/solicitante.component";
import { EditComponent } from './views/homologacion/edit.component';

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";
import {LoginComponent} from "./views/appviews/login.component";
import {QRCodeComponent} from "./views/appviews/qrcode.component";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationLayout.component";

export const ROUTES:Routes = [
  // Main redirect
  /*{path: '', redirectTo: 'starterview', pathMatch: 'full'},*/
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: 'homologacion', component: BasicLayoutComponent,
    children: [
      {path: 'search', component: SearchComponent},
      {path: 'registry', component: RegistryComponent},
      {path: 'solicitante', component: SolicitanteComponent},
      {path: 'editar', component: EditComponent }
    ]
  },
  {
    path: 'dashboards', component: TopNavigationLayoutComponent,
    children: [
      {path: 'dashboard41', component: Dashboard41Component}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'starterview', component: StarterViewComponent}
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'qrcode/:id', component: QRCodeComponent
    
  },

  // Handle all other routes
  /*{path: '**',  redirectTo: 'starterview'}*/
  {path: '**',  redirectTo: 'search'}
];
