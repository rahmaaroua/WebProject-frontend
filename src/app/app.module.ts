import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginGuard } from './guard/login.guard';
import {
  LoginInterceptor,
  LoginInterceptorProvider,
} from './interceptors/login.intercepter';
import { ResetComponent } from './reset/reset.component';
import { CartsModule } from './carts/carts.module';
import { SharedModule } from './shared/shared.module';
import {  Routes } from '@angular/router';


@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    CartsModule,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    SharedModule
  ],
  providers: [
    LoginGuard,
    LoginInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [LoginComponent, RegisterComponent, ResetComponent],
})
export class AppModule {}
