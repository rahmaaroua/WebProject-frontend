import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

import { CartComponent } from './carts/cart/cart.component';

import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from './shared/components/footer/footer.component';
import { SharedModule } from './shared/shared.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    FooterComponent,
    HeaderComponent,
    SharedModule

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrige le nom (styleUrl → styleUrls)
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
