import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  editing = false;

  constructor(
    private appComp: AppComponent,
    private userService: UsersService
  ) {}

  async ngOnInit() {
    this.appComp.changeNavbarTitle("Profile");

    await this.userService.getUser().subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  edit() {
    this.editing = true;
  }

  save() {
    this.userService.editUser(this.user).subscribe(
      (response) => {
        console.log('User edited:', response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.editing = false;
  }
}
