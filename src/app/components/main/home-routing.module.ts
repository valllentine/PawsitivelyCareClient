import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserProfileComponent } from './profile/profile.component';
import { UserChatsComponent } from './chats/chats.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';

const routes: Routes = [
  {
    path: 'posts',
    component: HomePage,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'myPosts',
    component: UserPostsComponent,
  },
  {
    path: 'createPost',
    component: CreatePostComponent,
  },
  {
    path: 'chats',
    component: UserChatsComponent,
  },
  {
    path: 'chat/:id',
    component:  ChatDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
