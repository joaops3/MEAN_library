import { Component } from '@angular/core';
import { IRoles } from "./interfaces/interfaces";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookHall';
  roles!: IRoles[]
  
  constructor(public authService: AuthService){
    this.authService.role.subscribe(value => {this.roles = value})
  }
}
