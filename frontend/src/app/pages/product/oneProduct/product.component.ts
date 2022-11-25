import { Component, OnInit } from '@angular/core';
import { IBook } from "src/app/interfaces/interfaces";
import { environment } from "src/environments/environment";
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import { AuthService } from "src/app/services/auth.service";
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
  id: string = this.route.snapshot.paramMap.get('id')!;
  roles!: any[]
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
     this.authService.role.subscribe((value) => {
       this.roles = value;
     });
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    
    this.bookService
      .findOne(this.route.snapshot.paramMap.get('id')!)
      .subscribe((data) => {
  
        this.data = data;
      });
  }

  delete() {
    this.bookService
      .delete(this.route.snapshot.paramMap.get('id')!)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  permitionToSee() {
    if (this.roles.includes('ADMIN')) {
      return true;
    }
    return false;
  }
}
