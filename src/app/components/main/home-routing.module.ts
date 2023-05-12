import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserChatsComponent } from './user-chats/user-chats.component';
import { CreatePostComponent } from './create-post/create-post.component';

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
    path: 'chats',
    component: UserChatsComponent,
  },
  {
    path: 'createPost',
    component: CreatePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
