import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../auth/auth-response.model';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlKayıtOlApi =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJFg7X3w21YXWVAgaJn_zKDdJSsDcjK_Y';
  UrlGirişYapApi =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJFg7X3w21YXWVAgaJn_zKDdJSsDcjK_Y';

  constructor(private http: HttpClient, private router: Router) {}
  user = new BehaviorSubject<User>(null);

  //Kayıt Ol
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.urlKayıtOlApi, {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  //Giriş Yap
  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.UrlGirişYapApi, {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  //Çıkış Yap
  logout() {
    this.user.next(null);
    localStorage.removeItem("user")//kayıtlı user bilgininin silinmesi
    this.router.navigate(['/auth']); //Giriş sayfasına gider.
  }

  //Tarayıcıda saklanan bilgi
  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user.__tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationaDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationaDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
