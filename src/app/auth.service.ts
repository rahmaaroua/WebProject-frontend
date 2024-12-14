import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private link = 'http://localhost:3000/user'; // Base URL pour le backend

  constructor(private http: HttpClient,private router: Router) {
  }

  // Méthode pour enregistrer un utilisateur
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.link}/register`, userData);
  }

  // Méthode pour se connecter
  login(credentials: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.link}/login`, credentials);
  }////pour access access_token c'est le Type de la réponse attendue.
//Indique que l'API backend retourne un objet JSON contenant une clé access_token.

  // Méthode pour récupérer le profil de l'utilisateur
  getProfile(): Observable<any> {
    return this.http.get(`${this.link}/profile`);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);//il va se naviguer vers welcomepage à la fin du projet
  }

  save(userData: { numerotelephone: number | null ; nationality: string; age: number|null  ; birthdate:Date | null; ville:string ; adresselivraison:string}): Observable<any> {
    return this.http.post(`${this.link}/save`, userData);
  }
}




