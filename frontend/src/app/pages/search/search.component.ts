import { Component, OnInit } from '@angular/core';
import { BookService } from "src/app/services/book.service";
import { environment } from "src/environments/environment";
import { IBook } from "src/app/interfaces/interfaces";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  showData = new BehaviorSubject<IBook[]>([])
  data: IBook[] = [];
  baseURL: string = environment.baseUrl;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.onLoad();
  }

  setData(books: IBook[]){
    this.showData.next(books)
  }

  getData(): Observable<IBook[]>{
    return this.showData.asObservable()
  }
  
  async onLoad() {
    let query: any
    this.route.queryParams.subscribe((value)=> {query = value})
    if(!query) return
    this.bookService.findAll().subscribe((resp) => {
      this.setData(resp.filter((item) => {
       return item.title.toLowerCase().includes(query.title.toLowerCase())
      }))
      this.getData().subscribe(data=> {this.data = data})
    });
  }

  
}
