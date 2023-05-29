import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
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
  images: string[] = [];

  constructor(
    private appComp: AppComponent,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.appComp.changeNavbarTitle('Create a Post');

    this.postCreationForm = this.formBuilder.group({
      PostType: ['', Validators.required],
      PostCategoryId: ['', Validators.required],
      Title: ['', Validators.required],
      Content: ['', Validators.required],
      Location: ['', Validators.required],
    });
  }

  onSubmit() {
    const post: Post = this.postCreationForm.value;
    this.postsService.createPost(post).subscribe(
      (res) => {
        this.postsService.uploadImages(this.images, res.id).subscribe(
          () => {
            this.presentToast('Post created successfully');
            this.router.navigateByUrl('/home/myPosts');
            this.postCreationForm.reset();
          },
          (error) => {
            alert('Something went wrong uploading images. Please try again later.');
          }
        );
      },
      (error) => {
        alert('Something went wrong. Please try again later.');
      }
    );
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleImageLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  handleImageLoaded(e: any) {
    const base64Result = e.target.result;
    const base64Data = base64Result.split(',')[1];
    this.images.push(base64Data);
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
