import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post, PostCategory, PostType } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postCreationForm: FormGroup;
  postTypes: typeof PostType = PostType;
  postCategories: typeof PostCategory = PostCategory;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.postCreationForm = this.formBuilder.group({
      PostType: ['', Validators.required],
      PostCategory: ['', Validators.required],
      Title: ['', Validators.required],
      Content: ['', Validators.required],
      Location: ['', Validators.required],
    });
  }

  onSubmit() {
    const post: Post = this.postCreationForm.value;
    this.postsService.createPost(post).subscribe(
      res => {
        this.presentToast('Post created successfully');
        this.router.navigate(['/posts/myPosts']);
      },
      error => {
        alert('Something went wrong. Please try again later.');
      }
    );
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
