import { User } from "./user.model";
import { Comment } from "./comment.model";

export interface CommentUser {
    comment: Comment;
    creator: User;
  }