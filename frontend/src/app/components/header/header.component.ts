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
}
