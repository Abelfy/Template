import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  url: string;
  currentUser: User;
  
  constructor(private breakpointObserver: BreakpointObserver,
  private authSrv: AuthentificationService,
   private router : Router) {
    this.url = this.router.url
    this.authSrv.currentUser.subscribe(user => { 
      this.currentUser = user});
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

      //TODO : Charger les élèments du menu dynamiquement en appelant un service MenuItems
      
}
