export enum Gender {
  Other = 0,
  Female = 1,
  Male = 2
}

export interface User {
    Id?: string;
    Name?: string;
    Surname?: string;
    Gender?: Gender;
    Phone?: string;
    Email?: string;
    Password?: string;
  }
  