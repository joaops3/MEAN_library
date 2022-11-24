import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  AuthorizedRoles = 'ADMIN';
  userRoles!: string[];
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.authService.role.subscribe((value) => {
      this.userRoles = value;
    });
    if(this.userRoles.includes(this.AuthorizedRoles)){
      return true
    }
    // this.userRoles.forEach((role) => {
    //   if (this.AuthorizedRoles.includes(role)) {
    //     return true;
    //   }
    // });
    this.router.navigate(['/login']);
    return false;
  }
}
