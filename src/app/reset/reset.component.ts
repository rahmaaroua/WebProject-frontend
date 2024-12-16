import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule,],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  constructor(private authService: AuthService) {}

  email: string = ''; 

  send():void{
    this.authService.send(this.email).subscribe(
      (response) => {
        alert("The email to recover the password has been sent.");
        console.log("The email to recover the password has been sent.",response);
      },
      (error) => {
        console.error('The email to recover the password has not been sent.');
        alert("The email to recover the password has not been sent.")
      }

    )
    
  }
 
}
