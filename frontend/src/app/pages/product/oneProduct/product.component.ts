import { Component, OnInit } from '@angular/core';
import { IBook } from "src/app/interfaces/interfaces";
import { environment } from "src/environments/environment";
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  data!: IBook;
  baseURL: string = environment.baseUrl;
  faTimes = faTimes;
  faEdit = faEdit;
  id: string = this.route.snapshot.paramMap.get("id")!
  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.onLoad()
  }


  onLoad(){
    console.log(this.route.snapshot.paramMap.get('id')!);
    this.bookService.findOne(this.route.snapshot.paramMap.get("id")!).subscribe((data)=> { console.log(data);this.data = data})
  }

  delete(){
   
    this.bookService.delete(this.route.snapshot.paramMap.get('id')!).subscribe(()=> {this.router.navigate(["/"])})
  }
}
