export interface Response<T> {
  message?: string;
  data: T;
}

export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  book?: string[];
}

export interface IBook {
  _id?: string;

  author: string;

  country: string;

  imageLink: string;

  title: string;
}
