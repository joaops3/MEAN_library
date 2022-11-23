import { Component, OnInit } from '@angular/core';
import {BookService } from 'src/app/services/book.service';
import { environment } from "src/environments/environment";
import { IUser, IBook } from '../../interfaces/interfaces';
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons"
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: IBook[] = []
  baseURL: string = environment.baseUrl
  faTimes = faTimes
  faEdit = faEdit
  limit = 9
  page = 1
  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.onLoad()
  }

  async onLoad() {
    this.bookService.findAll(this.page, this.limit).subscribe((resp) => {
      let randomOrder = resp
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      this.data = randomOrder})
  }

  handlePagination(){
    this.page++
    this.bookService.findAll(this.page, this.limit).subscribe((resp) => {
       let randomOrder = resp
         .map((value) => ({ value, sort: Math.random() }))
         .sort((a, b) => a.sort - b.sort)
         .map(({ value }) => value);
      this.data = this.data.concat(randomOrder)
    });
  }
}
