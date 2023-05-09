import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {

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
