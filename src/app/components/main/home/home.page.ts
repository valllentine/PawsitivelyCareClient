import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public get isLogginIn():boolean {
    return this.authService.isAuthenticated();
  }
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {}
  
  logout() {
    this.authService.logout;
  }

}
