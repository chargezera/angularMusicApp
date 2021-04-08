import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import { User } from './User';
import { RegisterUser } from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public readToken(): User {
    return helper.decodeToken(localStorage.getItem('access_token'));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      console.log('tokenExists = TRUE');
      return true;
    } else {
      console.log('tokenExists = FALSE');
      return false;
    }
  }

  public login(user: User): Observable<any> {
    return this.http.post<any>(environment.userAPIBase + "/login", user);
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  public register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(environment.userAPIBase + "/register", registerUser);
  }
}