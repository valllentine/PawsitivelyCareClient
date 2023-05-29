import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Post, PostCategory, PostType } from '../models/post.model';
import { BACKEND_API_URL } from '../app-injection-tokens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private http: HttpClient,
    @Inject(BACKEND_API_URL) private apiUrl: string
  ) {}

  async getPosts(
    type: PostType,
    category: number,
    location: string
  ): Promise<Post[]> {
    let params = new HttpParams()
      .set('type', type.toString())
      .set('category', category)
      .set('location', location);

    const posts = await this.http
      .get<Post[]>(`${this.apiUrl}api/posts/`, { params })
      .toPromise();

    if (posts === undefined) {
      return [];
    }

    const finalPosts = await this.test(posts)

    return finalPosts;
  }

  getUserPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}api/posts/myPosts`, {});
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}api/posts/${postId}`);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}api/posts/` + post.id, post);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}api/posts`, post);
  }

  deletePost(postId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}api/posts/${postId}`);
  }

  async getPostImages(postId: string): Promise<string[]> {
    const images = await this.http
      .get<string[]>(`${this.apiUrl}api/posts/${postId}/images`)
      .toPromise();

    if (images === undefined) {
      return [];
    }

    return images;
  }

  uploadImages(images: string[], postId: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}api/posts/${postId}/images`,
      images
    );
  }

  private async test(posts: Post[]) {
    posts.forEach(async (post: Post) => {
      post.images = await this.getPostImages(post.id);

      if (post.images) {
        for (let i = 0; i < post.images.length; i++) {
          const image = post.images[i];
          const photoBlob = await this.base64toBlob(image);
          const photoFile = new File([photoBlob], 'img.jpeg', {
            type: 'image/jpeg',
          });
          post.images[i] = URL.createObjectURL(photoFile);
        }
      }
    });

    return posts;
  }

  private async base64toBlob(base64: string) {
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
