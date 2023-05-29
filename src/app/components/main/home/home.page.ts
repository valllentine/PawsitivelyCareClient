import { Component } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts: Post[] = [];
  selectedType: PostType = PostType.Customer;
  selectedCategory: number = 0;
  selectedLocation: string = '';
  postTypes: typeof PostType = PostType;
  postCategories: typeof PostCategory = PostCategory;
  imagesLoaded: boolean = false;
  
  constructor(
    private appComp: AppComponent,
    private authService: AuthenticationService,
    private postService: PostsService,
    private chatService: ChatsService,
    private commentsService: CommentsService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.appComp.changeNavbarTitle("Posts")
    await this.getPosts();
    console.log(this.posts)
    this.imagesLoaded = true;
  }

  public get isLogginIn(): boolean {
    return this.authService.isAuthenticated();
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
            (data: Comment[]) => {
              this.posts[currentPostIndex].comments = data;
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  async getPostImages(postId: string): Promise<string[]> {
    const images: string[] = await this.postService.getPostImages(postId);

    for (let image of images) {
      const photoBlob = this.base64toBlob(image);
      const photoFile = new File([photoBlob], 'img.jpeg', { type: 'image/jpeg' });
      image = URL.createObjectURL(photoFile);
    }
    return images;
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

  private base64toBlob(base64: string) {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }
}
