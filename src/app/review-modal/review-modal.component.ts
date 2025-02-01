import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Import AuthService


@Component({
  standalone: true,
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ReviewModalComponent {
  newReview = { content: '', rating: 0 };

  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reviews: any[] },
    private authService: AuthService // Inject AuthService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitReview(): void {
    const userName = this.authService.getUserName(); // Get the user's name
    const review = {
      content: this.newReview.content,
      rating: this.newReview.rating,
      author: userName // Use the user's name
    };
    this.data.reviews.push(review);
    this.newReview = { content: '', rating: 0 }; // Reset the form
  }
}
