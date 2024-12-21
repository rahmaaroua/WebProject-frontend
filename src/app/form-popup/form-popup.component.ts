import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DxButtonModule, DxDataGridModule, DxPopupModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DataComponent } from '../data/data.component';

@Component({
  selector: 'app-form-popup',
  standalone: true,
  imports: [RouterOutlet,RouterModule,DxDataGridModule, DxButtonModule,DxPopupModule,ReactiveFormsModule,DataComponent],
  templateUrl: './form-popup.component.html',
  styleUrl: './form-popup.component.css'
})
export class FormPopupComponent {
  @Input() visible: any;
  @Input() customer: any;
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  selectedCustomerId: any ;
  currentCustomer: any;
  popupVisible = false;
  formPopupVisible = false;
  customerPopupVisible = false;
  buttonText: any;
  




 

  closePopup() {
    this.close.emit();
  
  }
 


  


}
