import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  isLogged: boolean = true;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleSearch(e?: any) {
    this.router.navigate([`/book/${e.target.value}`])
  }

  handleEnter(e: any){
    if(e.key ==="Enter"){
       this.handleSearch(e)
    }
  }
}
