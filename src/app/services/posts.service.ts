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

  getPosts(type: PostType, category: number, location: string): Observable<Post[]> {
    let params = new HttpParams()
    .set('type', type.toString())
    .set('category', category)
    .set('location', location);
    return this.http.get<Post[]>(`${this.apiUrl}api/posts/`, {params});
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

  createPost(post: Post): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}api/posts`, post);
  }

  deletePost(postId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}api/posts/${postId}`);
  }
}
