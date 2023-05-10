import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.postService.getUserPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
      },
      (error) => {
        console.log(error);
      }
    );
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

  async showComments(post: Post) {
    const foundPost = this.posts.find((p) => p.id === post.id);

    if (foundPost) {
      foundPost.showComments = !foundPost.showComments;

      if (foundPost.showComments) {
        this.commentService.getComments(foundPost.id);
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

  async deletePost(post: any) {
    // this.postService.deletePost(post);
  }
}
