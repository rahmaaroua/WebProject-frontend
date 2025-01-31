import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
