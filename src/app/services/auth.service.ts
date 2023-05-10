import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { BACKEND_API_URL } from '../app-injection-tokens';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { FormGroup } from '@angular/forms';

export const TOKEN = 'token';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  constructor(
    private http: HttpClient,
    @Inject(BACKEND_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  private isLoginPage = new BehaviorSubject<boolean>(false);
  public isLoginPage$ = this.isLoginPage.asObservable();

  setIsLoginPage(isLoginPage: boolean): void {
    this.isLoginPage.next(isLoginPage);
  }

  login(email: string, password: string): Observable<Token> {
    return this.http
      .post<Token>(`${this.apiUrl}api/users/login`, {
        email,
        password,
      })
      .pipe(
        tap(token => {
          localStorage.setItem(TOKEN, token.token);
        })
      );
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(TOKEN);
    return token !== null && !this.jwtHelper.isTokenExpired(token);
}

  logout(): void {
    localStorage.removeItem(TOKEN);
    this.setIsLoginPage(true);
    this.router.navigate(['/auth/login']);
  }

  register(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}api/users/register`, user);
  }
}
