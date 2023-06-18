import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { CommentUser } from 'src/app/models/comment-user.model';
import { Post, PostCategory, PostType } from 'src/app/models/post.model';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];
  newPost: Post;
  postCategories: typeof PostCategory = PostCategory;
  postTypes: typeof PostType = PostType;
  isHasComments: boolean;

  constructor(
    private appComp: AppComponent,
    private postService: PostsService,
    private commentsService: CommentsService,
    private alertCtrl: AlertController,
    private router: Router,
    private toastController: ToastController,
  ) {}

  async ngOnInit() {
    this.appComp.changeNavbarTitle("My Posts")
    await this.getUserPosts();
  }

  async getUserPosts() {
    this.posts = await this.postService.getUserPosts();
  }

  async editPost(post: any) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Post',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: post.title,
          placeholder: 'Title',
        },
        {
          name: 'location',
          type: 'text',
          value: post.location,
          placeholder: 'Location',
        },
        {
          name: 'content',
          type: 'text',
          value: post.content,
          placeholder: 'Description',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            post.title = data.title;
            post.location = data.location;
            post.content = data.content;

            this.sendPost(post)
          },
        },
      ],
    });
    await alert.present();
  }

  async createPost() {
    this.router.navigate(['/home/createPost']);
  }

  async showComments(post: Post) {
    const currentPostIndex = this.posts.findIndex((p) => p.id === post.id);

    if (currentPostIndex !== -1) {
      const currentPost = this.posts[currentPostIndex];
      this.posts[currentPostIndex].showComments = !this.posts[currentPostIndex].showComments;

      if (currentPost.showComments) {
        this.commentsService
          .getComments(currentPost.id)
          .subscribe(
            (data: CommentUser[]) => {
              this.posts[currentPostIndex].comments = data;
              this.isHasComments = data.length > 0 ? true : false;
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  async sendPost(post: any) {
    this.postService.editPost(post).subscribe(
      (response) => {
        console.log('Post edited:', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(
      (response) => {
        this.presentToast('Post deleted successfully');
        this.getUserPosts();
      },
      (error) => {
        alert('Something went wrong. Please try again later.');
      }
    );

    this.getUserPosts();
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
