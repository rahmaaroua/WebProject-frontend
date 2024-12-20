import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet,  LoginComponent, RegisterComponent,CartComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrige le nom (styleUrl → styleUrls)
})
export class AppComponent {
  title = 'Trendora_frontend';

  constructor(private router: Router,private authService: AuthService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  logout(){
    this.authService.logout();
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  goToUser() {
    this.router.navigate(['user/:id']);
  }

}
