import { Component, OnInit } from '@angular/core';
import {BookService } from 'src/app/services/book.service';
import { environment } from "src/environments/environment";
import { IUser, IBook } from '../../interfaces/interfaces';
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons"
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
  limit = 10
  page = 1
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.onLoad()
  }

  async onLoad() {
    this.bookService.findAll(this.page, this.limit).subscribe((resp) => {this.data = resp})
  }

  handlePagination(){
    this.page++
    this.bookService.findAll(this.page, this.limit).subscribe((resp) => {
      this.data = this.data.concat(resp)
    });
  }
}
