import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent  implements OnInit {
  user: User;
  editing = false;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (data: User) => {
        this.user = data;
        console.log(data)
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
