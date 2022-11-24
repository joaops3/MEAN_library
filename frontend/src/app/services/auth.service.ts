import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { IRoles, IUser} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLogged = this._isLoggedIn$.asObservable();
  private _role$ = new BehaviorSubject<any>(["USER"])
  role = this._role$.asObservable()
  constructor(private http: HttpClient, private route: Router) {
    const user = localStorage.getItem('user');
    this._isLoggedIn$.next(!!user);
    if(!user) return
    let userjson = JSON.parse(user)
    this._role$.next(userjson.role)
  }

  login(data: { email: string; password: string }) {
    return this.http
      .post<{ id: string; role: IRoles; access_token: string }>(
        environment.baseUrl + '/auth/login',
        data
      )
      .subscribe((resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
        this._isLoggedIn$.next(true);
        this.route.navigate(['/']);
        console.log("authservice",resp.role)
        this._role$.next(resp.role)
      });
  }

  logout() {
    localStorage.removeItem('user');
    this._isLoggedIn$.next(false);
  }
}
