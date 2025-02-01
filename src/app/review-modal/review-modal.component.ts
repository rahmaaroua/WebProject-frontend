import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent {
  newReview = { content: '', rating: 0 };

  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reviews: any[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitReview(): void {
    const review = {
      content: this.newReview.content,
      rating: this.newReview.rating,
      author: 'Customer' // Replace with actual author info if available
    };
    this.data.reviews.push(review);
    this.newReview = { content: '', rating: 0 }; // Reset the form
  }
}