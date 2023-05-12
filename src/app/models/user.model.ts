export enum Gender {
  Other = 0,
  Female = 1,
  Male = 2
}

export interface User {
    id?: string;
    name?: string;
    surname?: string;
    gender?: Gender;
    phone?: string;
    email?: string;
    password?: string;
  }
  