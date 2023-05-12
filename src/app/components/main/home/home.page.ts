import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { PostType } from 'src/app/models/post.model';
import { PostCategory } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  keys = Object.keys;
  commentService: any;
  posts: Post[] = [];
  selectedType: PostType = PostType.Customer;
  selectedCategory: number = 0;
  selectedLocation: string = "";
  postTypes: typeof PostType = PostType;
  postCategories: typeof PostCategory = PostCategory;

  constructor(private authService: AuthenticationService, private postService: PostsService,) { }

  ngOnInit() {
    this.getPosts();
  }

  public get isLogginIn():boolean {
    return this.authService.isAuthenticated();
  }

  async getPosts() {
    this.postService.getPosts(this.selectedType, this.selectedCategory, this.selectedLocation).subscribe(
      (data: Post[]) => {
        this.posts = data;
      },
      (error) => {
        console.log(error);
      }
    );
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

}
