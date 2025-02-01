import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://localhost:3000/reviews'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getReviews(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?productId=${productId}`);
  }
}
