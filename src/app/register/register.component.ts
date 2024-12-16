import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, RouterModule], // Importez CommonModule pour ngClass
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  registerObj={
    name: '',
    email: '',
    password: ''
  }


  onRegister() {
    this.authService.register(this.registerObj).subscribe(
      (response) => {
        console.log('Inscription réussie', response);
        alert('inscription successful')
        // Afficher un message de confirmation ou rediriger l'utilisateur
        // this.router.navigate(['/login']); // Redirection vers la page de connexion
      },
      (error) => {
        console.error('Inscription failed:', error.message || 'Une erreur est survenue');
      }
    );
  }
}
