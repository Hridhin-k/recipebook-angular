import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './auth/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  private tokenExpirationTimer: any
  constructor(private http: HttpClient, private router: Router) { }
  signup(email: string, password: string) {
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
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
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
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
  autologin() {

    const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {

      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser) {

      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autologout(expirationDuration)
    }
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['auth'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autologout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);  //expirationDuration

  }


  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user);
    this.autologout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))

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
