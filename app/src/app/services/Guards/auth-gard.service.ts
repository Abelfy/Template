import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private AuthSrv : AuthentificationService) { }
  
  canActivate(route, state:RouterStateSnapshot) {
      const currentUser = this.AuthSrv.currentUserValue;
        if (currentUser) {
            console.log('Logged');
            // logged in so return true
            return true;
        }

        console.log('Not logged');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
  }
}
