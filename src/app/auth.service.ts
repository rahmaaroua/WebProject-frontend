import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private link = 'http://localhost:3000/user';

  private userData = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com'
  };
  private userData_with_id = {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com'
  };

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.link}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${this.link}/login`,
      credentials
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.link}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  save(userData: {
    numerotelephone: number | null;
    nationality: string;
    age: number | null;
    birthdate: Date | null;
    ville: string;
    adresselivraison: string;
  }): Observable<any> {
    return this.http.post(`${this.link}/save`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  send(email: string): Observable<any> {
    return this.http.post(`${this.link}/recover-password`, { email });
  }

  getUserWithProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.link}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  getUserData() {
    return this.userData;
  }

  getUserData_with_id() {
    return this.userData_with_id;
  }

  getUserName(): string {
    return `${this.userData.firstName} ${this.userData.lastName}`;
  }
}