import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Chat } from 'src/app/models/chat.model';
import { MessageDto } from 'src/app/models/create-message.model';
import { Message } from 'src/app/models/message.model';
import { Post, PostCategory, PostType } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { ChatsService } from 'src/app/services/chats.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss'],
})
export class ChatDetailsComponent implements OnInit {
  chatId: string;
  currentUser: User;
  chatInfo: Chat;
  postInfo: Post;
  messages: Message[] = [];
  newMessage: string;
  postTypes: typeof PostType = PostType;
  postCategories: typeof PostCategory = PostCategory;
  showScrollTopButton = false;
  showPost = false;

  constructor(
    private appComp: AppComponent,
    private route: ActivatedRoute,
    private chatsService: ChatsService,
    private usersService: UsersService,
    private postsService: PostsService
  ) {}

  async ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.chatsService.getMessagesForChat(this.chatId).subscribe((messages) => {
      this.messages = messages;
      this.showScrollTopButton = this.messages.length > 10;
    });

   this.chatInfo = await this.chatsService.getChat(this.chatId);

    if (this.chatInfo) {
      this.postsService.getPost(this.chatInfo.postId).subscribe((post) => {
        this.postInfo = post;
      });
    }
    
    this.appComp.changeNavbarTitle(this.chatInfo.name)
  }

  sendMessage() {
    if (!this.newMessage) {
      return;
    }
    const message: MessageDto = {
      text: this.newMessage,
      chatId: this.chatId,
      senderId: this.currentUser.id,
    };

    this.chatsService.createMessage(message).subscribe(
      (res) => {},
      (error) => {
        alert('Something went wrong. Please try again later.');
      }
    );
    this.newMessage = '';
  }

  openPost() {
    this.showPost = !this.showPost;
  }
}
