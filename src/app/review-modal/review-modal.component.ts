import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reviews: any[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
