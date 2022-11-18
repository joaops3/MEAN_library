import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Response, IUser } from "../interfaces/interfaces";
@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL: string = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Response<IUser[]>> {
    return this.http.get<Response<IUser[]>>(this.URL)
  }

  findOne(id: string): Observable<Response<IUser>> {
     return this.http.get<Response<IUser>>(this.URL + id);
  }
}
