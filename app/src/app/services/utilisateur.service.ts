import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  getAllUtilisateurs(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/user`);
  }

  getUtilisateur(id: string): Observable<User> {
    return this.http.get<User>(`${environment.api}/user/${id}`);
  }

  addUtilisateur(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api}/user`, user);
  }

  modifyUtilisateur(data: any): Observable<any> {
    return this.http.put(`${environment.api}/user/edit`, data);
  } 
}
