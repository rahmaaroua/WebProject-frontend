import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  onsubmit(){
    alert("The email has been sent.");
    console.log("The email has been sent.");
  }
}
