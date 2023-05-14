import { Component } from '@angular/core';
import { AuthenticationService, TOKEN } from './services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public isLoginPage: boolean = false;
  navbarTitle: string = 'PawsitivelyCare';

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.isLoginPage$.subscribe(isLoginPage => {
      this.isLoginPage = isLoginPage;
    });
  }

  logout() {
    this.authService.logout()
  }

  changeNavbarTitle(title: string) {
    this.navbarTitle = title;
  }
}
