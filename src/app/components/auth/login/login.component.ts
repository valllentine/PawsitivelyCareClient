import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthenticationService, private router: Router) { }

  @ViewChild('loginForm') loginForm: NgForm;

  email: string;
  password: string;

  ngOnInit(): void {
    this.authService.setIsLoginPage(true);
  }

  public get isLogginIn(): boolean {
    return this.authService.isAuthenticated();
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(res =>{
      this.authService.setIsLoginPage(false);
      this.loginForm.reset();
      this.router.navigateByUrl('home/posts');
    }, error => {
      alert("Wrong login or password")
    })
  }

  logout() {
    this.authService.logout;
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
