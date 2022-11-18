import { Component, OnInit } from '@angular/core';
import { BookService } from "src/app/services/book.service";
import { environment } from "src/environments/environment";
import { IBook } from "src/app/interfaces/interfaces";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  data: IBook[] = [];
  baseURL: string = environment.baseUrl;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.onLoad();
  }

  async onLoad() {
    const query = this.route.snapshot.paramMap.get("name")
    if(!query) return
    this.bookService.findAll().subscribe((resp) => {
      this.data = resp.filter((item) => {
       return item.title.toLowerCase().includes(query.toLowerCase())
      })
    });
  }

  
}
