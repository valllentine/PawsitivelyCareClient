import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageDto } from 'src/app/models/create-message.model';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss'],
})
export class ChatDetailsComponent implements OnInit {
  chatId: string;
  currentUser: User;
  messages: Message[] = [];
  newMessage: string;
  showScrollTopButton = false;

  constructor(
    private route: ActivatedRoute,
    private chatsService: ChatsService,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    console.log("init")
    this.chatId = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.chatsService.getMessagesForChat(this.chatId).subscribe((messages) => {
      this.messages = messages;
      console.log(messages)
      this.showScrollTopButton = this.messages.length > 10;
    });
  }

  sendMessage() {
    if (!this.newMessage) {
      return;
    }
    const message: MessageDto = {
      text: this.newMessage,
      chatId: this.chatId,
      senderId: this.currentUser.id,
    }

    this.chatsService.createMessage(message);
    this.newMessage = '';
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
