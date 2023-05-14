import { Comment } from "./comment.model";

export enum PostType {
  Customer = 0,
  Executor = 1
}

export enum PostCategory {
  Medicine = 1,
  Walking = 2,
  Grooming = 3, 
  Training = 4,
  PetSitting = 5,
  VeterinaryCare = 6,
  Other = 7
}

export interface Post {
    id: string;
    title: string;
    content: string;
    location: string;
    createdAt: Date;
    creatorId: string;
    postCategoryId: number;
    type: PostType;

    showComments: boolean;
    comments: Comment[];
  }
  