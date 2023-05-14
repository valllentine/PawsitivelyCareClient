import { Inject, Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../app-injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private http: HttpClient,
    @Inject(BACKEND_API_URL) private apiUrl: string
  ) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}api/users`, );
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}api/users`, user);
  }
}
