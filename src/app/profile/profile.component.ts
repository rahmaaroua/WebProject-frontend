import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
   constructor(private authService: AuthService) {}
   client = {
    numerotelephone: null,
    nationality:'',
    age: null ,
    birthdate:null,
    ville:'',
    adresselivraison:''
  }
 
      
  onSubmit():void{
    this.authService.save(this.client).subscribe(
      (response) => {
        alert('Submit successful');
        console.log('Submit successful', response);
      },
      (error) => {
        console.error('submit failed');
        alert("submit failed")
      }
    )

  }

}
