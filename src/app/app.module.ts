import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DevExtremeModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { CatalogueComponent } from './catalogue/catalogue.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
     FormsModule,
     CommonModule,
     RouterModule ,
     DxPopupModule,
     DxCheckBoxModule,
     DxSelectBoxModule,
     DevExtremeModule,
     DxNumberBoxModule,
     DxFormModule,
     DxButtonModule,
     DxDataGridModule
  ],
  bootstrap: [AppComponent],
  exports: [LoginComponent, RegisterComponent,CatalogueComponent],

})
export class AppModule {}
