import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  commentText: string;
  
  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss();
  }
  
  save() {
    const comment = this.commentText;
    this.modalController.dismiss({ comment });
  }
}
