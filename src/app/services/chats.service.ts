import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';
import { MessageDto } from '../models/create-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  constructor(
    private http: HttpClient,
    @Inject(BACKEND_API_URL) private apiUrl: string
  ) {}


  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}api/chats`, {});
  }

  createChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}api/chats`, chat);
  }
  
  getMessagesForChat(chatId: string): Observable<Message[]> {
    let params = new HttpParams()
    .set('chatId', chatId);
    return this.http.get<Message[]>(`${this.apiUrl}api/chats/messages`, {params});
  }

  createMessage(message: MessageDto): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}api/chats/messages`, message);
  }
}
