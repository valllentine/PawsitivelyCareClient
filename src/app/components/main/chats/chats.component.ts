import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-user-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class UserChatsComponent  implements OnInit {
  chats: Chat[] = [];

  constructor(private chatService: ChatsService) {}

  ngOnInit() {
    this.chatService.getChats().subscribe((chats) => {
      this.chats = chats;
    });
  }
}
