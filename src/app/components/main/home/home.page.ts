import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { PostType } from 'src/app/models/post.model';
import { PostCategory } from 'src/app/models/post.model';
import { ChatsService } from 'src/app/services/chats.service';
import { Chat } from 'src/app/models/chat.model';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment.model';
import { CommentUser } from 'src/app/models/comment-user.model';
import { ModalController, ToastController } from '@ionic/angular';
import { CreateCommentComponent } from '../comment/create-comment/create-comment.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Post[] = [];
  selectedType: PostType = PostType.Customer;
  selectedCategory: number = 0;
  selectedLocation: string = '';
  postTypes: typeof PostType = PostType;
  postCategories: typeof PostCategory = PostCategory;
  imagesLoaded: boolean = false;
  isHasComments: boolean;
  
  constructor(
    private appComp: AppComponent,
    private postService: PostsService,
    private chatService: ChatsService,
    private commentsService: CommentsService,
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
  ) { }

 ngOnInit() {
    this.appComp.changeNavbarTitle("Posts");
    this.getPosts();
    this.imagesLoaded = true;
  }

  ionViewDidEnter() {
    this.appComp.changeNavbarTitle("Posts");
  }

  async getPosts() {
    this.posts = await this.postService.getPosts(this.selectedType, this.selectedCategory, this.selectedLocation);
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

  async createChat(post: Post) {
    const chat: Chat = {
      id: '',
      name: post.title,
      postId: post.id,
      postCreatorId: post.creatorId,
    }

    this.chatService.createChat(chat).subscribe(
      res => {
        const id: string = res.id;
        this.router.navigateByUrl(`/chat/${id}`);
      },
      error => {
        alert('Something went wrong. Please try again later.');
      }
    );
  }

  async openCommentModal(postId: string) {
    const modal = await this.modalController.create({
      component: CreateCommentComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      const comment: Comment = {
        text: data.comment,
        postId: postId,
      };

      this.commentsService.createComment(comment).subscribe(
        (res) => {
          this.presentToast('Comment created successfully');
        },
        (error) => {
          alert('Something went wrong. Please try again later.');
        }
      );
    }
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
