import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IBook } from "src/app/interfaces/interfaces";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  data!: IBook
  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if(!id) return
    this.bookService.findOne(id).subscribe((data) => {;this.data = data})
  }


  onSubmit(){

  }
}
