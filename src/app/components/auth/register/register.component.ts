import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Gender, User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  gender: typeof Gender = Gender;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      Gender: ['', Validators.required],
    });
  }

  onSubmit() {
    const user: User = this.registrationForm.value;
    this.authService.register(user).subscribe(
      res => {
        this.presentToast('Registration successful');
        this.router.navigate(['/auth/login']);
      },
      error => {
        alert('Something went wrong. Please try again later. May be a user with this email already exists.');
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}
