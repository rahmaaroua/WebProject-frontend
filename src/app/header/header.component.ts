import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartsService } from '../Carts/carts.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartsService: CartsService
  ) {}

  ngOnInit(){
    this.cartsService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
