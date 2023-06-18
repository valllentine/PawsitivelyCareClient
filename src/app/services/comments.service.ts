import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { CommentUser } from '../models/comment-user.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(
    private http: HttpClient,
    @Inject(BACKEND_API_URL) private apiUrl: string
  ) {}

  getComments(postId: string): Observable<CommentUser[]> {
    return this.http.get<CommentUser[]>(`${this.apiUrl}api/comments/` + postId, { });
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}api/comments/`, comment);
  }
}
