import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { environment } from "src/environments/environment";
import { IUser, Response, IBook } from "../interfaces/interfaces";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class BookService {
  URL: string = `${environment.baseUrl}/book/`;

  constructor(private http: HttpClient) {}

  findAll(page?: number, limit?: number): Observable<IBook[]> {
    if(!page && !limit){
      return this.http.get<IBook[]>(this.URL);
    }
    return this.http.get<IBook[]>(`${this.URL}?page=${page}&limit=${limit}`);
  }

  findOne(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.URL}${id}`);
  }

  create(data: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.URL, data);
  }

  update(id:string, data: FormData): Observable<FormData> {
    return this.http.put<FormData>(this.URL+id, data);
  }

  delete(id: string) {
    return this.http.delete(this.URL+id);
  }
  
}
