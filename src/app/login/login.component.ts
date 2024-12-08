import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule,HttpClientModule], // Importez CommonModule pour ngClass

})
export class LoginComponent {
  loginObj = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.loginObj).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('access_token', response.access_token); // Stocker le token
        const token = localStorage.getItem('access_token');
        localStorage.removeItem('access_token');//// Supprimer l'access token


       // this.router.navigate(['/profile']); // Redirection vers le profil
      },
      (error) => {
        console.error('Login failed: Nom d’utilisateur ou mot de passe incorrect.');
      }
    );
  }
    
  
   


}

 
  /*loginObj : Login;
constructor( private http: HttpClient){
  this.loginObj = new Login()
}
/*

onLogin(loginObj : Login){
  this.http.post(this.loginObj).subscribe((res:any)=>{

  })
}
addTache(tache : Tache): Observable<any> {
  return this.http.post(this.link, tache);
}

  /*onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Call your login service here
    }}
*/
   
 /* 
}
export class Login {
 
  constructor(){
    this.email= '';
    this.password='';
  }
}*/

