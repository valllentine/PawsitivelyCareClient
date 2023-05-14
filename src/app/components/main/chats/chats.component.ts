import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Chat } from 'src/app/models/chat.model';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-user-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class UserChatsComponent implements OnInit {
  chats: Chat[] = [];

  constructor(
    private chatService: ChatsService,
    private appComp: AppComponent,
  ) {}

  ngOnInit() {
    this.appComp.changeNavbarTitle("Chats");
    
    this.chatService.getChats().subscribe((chats) => {
      this.chats = chats;
    });
  }
}
