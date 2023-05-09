import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';

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

  email: string ='';
  password: string ='';

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(res =>{

    }, error => {
      alert("Wrong login or password")
    })
  }

  logout() {
    this.authService.logout;
  }

}
