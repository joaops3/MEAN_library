import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  @Output() emmiter!: EventEmitter<{id: string, access_token: string}>
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }

  get email(){
    return this.form.get("email")!
  }

  get password(){
    return this.form.get("password")!
  }

  handleLogin(){
   if(this.form.invalid) return
   const data = this.form.value
    this.authService.login(data)



  }
}
