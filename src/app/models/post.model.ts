import { Comment } from "./comment.model";

export enum PostType {
  Customer = 0,
  Executor = 1
}

export interface Post {
    id: string;
    title?: string;
    content?: string;
    location?: string;
    createdAt?: Date;
    creatorId?: string;
    postCategoryId?: number;
    type: PostType;

    showComments: boolean;
    comments: Comment[];
  }
  