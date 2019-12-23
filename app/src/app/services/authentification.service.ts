import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { UtilisateurService } from './utilisateur.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userSrv: UtilisateurService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user_data')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(credentials) {
    return this.http.post<any>(`${environment.api}/authentification`, credentials)
      .pipe(map(userData => {
        console.log(userData.token);
        localStorage.setItem('AuthorizationToken', userData.token);
        this.userSrv.getUtilisateur(userData.userId).subscribe(user => {
          console.log(user);
          localStorage.setItem('user_data', JSON.stringify(user));
          this.currentUserSubject.next(user);

          return user;
        });
      }));
  }

  logout() {
    localStorage.removeItem('AuthorizationToken');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

}