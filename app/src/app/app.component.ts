import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  url: string;
  currentUser: User;
  
  constructor(private authSrv: AuthentificationService, private router : Router) {
    this.url = this.router.url
    this.authSrv.currentUser.subscribe(user => { 
      this.currentUser = user});
  }

  ngOnInit(){}
}
