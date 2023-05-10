import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Post } from '../models/post.model';
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

  getPosts(type: string, category: string, location: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}api/users/login`, {});
  }

  getUserPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}api/posts/myPosts`, {});
  }

  editPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}api/posts/edit/` + post.id, post);
  }
}
