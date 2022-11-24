export interface Response<T> {
  message?: string;
  data: T;
}

export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  book?: string[];
  role: IRoles[]
}

export enum IRoles {
  "USER", "ADMIN", "SELLER"
}

export interface IBook {
  _id?: string;

  author: string;

  country?: string;

  imageLink: string;

  title: string;

  language?: string

  link?: string

  pages?: number

  year?:number
}
