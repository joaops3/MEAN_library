import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { IRoles } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  @Input() isLogged!: Observable<boolean>
  @Input() roles!: any[]
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  handleSearch(e?: Event) {
    if(!e) return
    const target = e.target as HTMLInputElement
    this.router.navigate([`/search`], {queryParams: {title: target.value}})
  }

  handleEnter(e: any){
    if(e.key ==="Enter"){
       this.handleSearch(e)
    }
  }

  logout(){
    this.authService.logout()
  }


  permitionToSee(){
    if(this.roles.includes("ADMIN")){
      return true
    }
    return false
  }
}
