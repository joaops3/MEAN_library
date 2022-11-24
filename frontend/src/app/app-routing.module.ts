import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EditComponent } from "./pages/product/edit/edit.component";
import { NewComponent } from "./pages/product/new/new.component";
import { ProductComponent } from './pages/product/oneProduct/product.component';
import { SearchComponent } from "./pages/search/search.component";
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'book/new',
    component: NewComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'search', component: SearchComponent },
  { path: 'book/:id', component: ProductComponent },
  { path: 'book/:id/edit', component: EditComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
