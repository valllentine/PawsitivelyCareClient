import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home/home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserChatsComponent } from './user-chats/user-chats.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPostsComponent } from './user-posts/user-posts.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, UserChatsComponent, UserProfileComponent, UserPostsComponent]
})
export class HomePageModule {}
