import { Component, OnInit } from '@angular/core';
import {faLinkedin, faInstagram, faGithub} from "@fortawesome/free-brands-svg-icons"
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faLinkedin = faLinkedin
  faInstagram = faInstagram
  faGithub = faGithub
  
  constructor() { }

  ngOnInit(): void {
  }

}
