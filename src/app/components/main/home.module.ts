import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home/home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserChatsComponent } from './chats/chats.component';
import { UserProfileComponent } from './profile/profile.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';
import { AutosizeModule } from 'ngx-autosize';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    AutosizeModule
  ],
  declarations: [
    HomePage,
    UserChatsComponent,
    UserProfileComponent,
    UserPostsComponent,
    CreatePostComponent,
    ChatDetailsComponent,
    CreateCommentComponent,
  ],
})
export class HomePageModule {}
