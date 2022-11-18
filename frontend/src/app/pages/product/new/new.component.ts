import { Component, OnInit } from '@angular/core';
import { IBook } from "src/app/interfaces/interfaces";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  onSubmit(data: IBook){
    const formData = new FormData()
    for(let [key, value] of Object.entries(data)){
      formData.append(key, value)
    }
    this.bookService.create(formData).subscribe((resp)=> {console.log(resp)})
  }

}
