import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './auth/user.model';
export interface AuthResponceData {
  kind: string;
  refreshToken: string;
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { }
  signup(email: string, password: string) {
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkG1s8eJOe9SK9uzGtUKJqC_oQgx_i4RI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }))


  }
  login(email: string, password: string) {
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkG1s8eJOe9SK9uzGtUKJqC_oQgx_i4RI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user);
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "an unknown error occured";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL-EXIST': errorMessage = "this email already exists";
        break;
      case 'EMAIL-NOT-FOUND': errorMessage = "this email does not exist";
        break;
      case 'INVALID-PASSWORD': errorMessage = "this password is incorrect";
    }
    return throwError(errorMessage);
  }
}
