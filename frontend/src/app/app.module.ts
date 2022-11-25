import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './pages/product/oneProduct/product.component';
import { NewComponent } from './pages/product/new/new.component';
import { EditComponent } from './pages/product/edit/edit.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorInterceptor } from "./middlewares/token-interceptor.interceptor";


//-----angular materials-----

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    FormUserComponent,
    FormProductComponent,
    SigninComponent,
    ProductComponent,
    NewComponent,
    EditComponent,
    SearchComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule
   
  ],
  providers: [AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
