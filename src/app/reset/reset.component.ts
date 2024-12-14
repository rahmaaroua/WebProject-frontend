import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule,],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  email: string = ''; 
}
