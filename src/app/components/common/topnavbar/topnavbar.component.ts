import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
declare var jQuery:any;
import { LoginService } from "../../../views/appviews/login.service";
import {Router} from '@angular/router';

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(private router: Router, private loginService: LoginService) {}

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  logout():void
  {
    console.log('logout');
    this.loginService.logout().subscribe(loggedOut => {
      if(loggedOut)
      {
        this.router.navigate(['/login']);
      }
    });
  }

}
