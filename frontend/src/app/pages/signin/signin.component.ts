import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IUser } from "src/app/interfaces/interfaces";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  handleSubmit(data: IUser){
    this.userService.create(data).subscribe(resp => {
      this.router.navigate(["/"])
    })
  }
}
