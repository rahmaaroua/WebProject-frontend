import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from './shared/components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './Carts/cart/cart.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    SharedModule,
    FormsModule

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne

})
export class AppComponent {
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  title = 'Trendora_frontend';

  constructor(private router: Router, private authService: AuthService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToCatalogue() {
    this.router.navigate(['/catalogue']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  logout() {
    this.authService.logout();
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  goToUser() {
    this.router.navigate(['user/:id']);
  }
  goToCart() {
    this.router.navigate(['cart']);
  }
}
