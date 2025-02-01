import { Component, enableProdMode } from '@angular/core';
import { NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { ProductsService } from '../products.service';
import { DataComponent } from '../data/data.component';
import { Product } from '../product.model';
import { Cart } from '../../Carts/cart.models';
import { CartsService } from '../../Carts/carts.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewModalComponent } from '../../review-modal/review-modal.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterOutlet,
    RouterModule,
    DataComponent,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    FormPopupComponent,
    ReactiveFormsModule,
    ProductPopupComponent,
    ChildComponent,
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent implements OnInit {
  products: any[] = [];
  product: any;
  selectedProductId: any;
  currentProduct: any;
  popupVisible = false;
  formPopupVisible = false;
  productPopupVisible = false;
  isEditMode = false;

  selectedProduct: Product | null = null;
  selectedProductReviews: any[] = [];
  reviewPopupVisible = false;

  moreInfoButtonOptions: any;
  emailButtonOptions: any;
  closeButtonOptions: any;

  cartProducts: any[] = []; // Array to store cart products
  newReview = { content: '', rating: 0 }; // Initialize the new review object

  constructor(private service: ProductsService, private cartService: CartsService, private router: Router, public  dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProducts();
    // Load the cart from local storage on initialization
    const storedCart = localStorage.getItem('cartProducts');
    if (storedCart) {
      this.cartProducts = JSON.parse(storedCart);
    }
  }

  getProducts() {
    this.service.getProducts().subscribe((products: any[]) => {
      this.products = products;
      console.log('All products', this.products);
    });
  }

  viewProductDetails(id: number): void {
    this.router.navigate(['/child', id]);
  }

  onButtonClick(id: number) {
    alert(`Button clicked for product with id: ${id}`);
  }

  showInfo(product: any) {
    this.currentProduct = product;
    this.popupVisible = true;
  }

  closePopup() {
    this.popupVisible = false;
    this.currentProduct = null;
    this.selectedProductId = null;
  }

  openFormPopup(product: any) {
    this.selectedProductId = product;
    this.isEditMode = true;
    this.formPopupVisible = true;
  }

  openFormPopup1() {
    this.formPopupVisible = true;
    this.isEditMode = false;
  }

  closeFormPopup() {
    this.formPopupVisible = false;
    this.currentProduct = null;
    this.selectedProductId = null;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id).subscribe((cart) => {
      this.cartService.setSelectedProducts(cart.cartItems);
    });
  }

  openReviewPopup(product: Product) {
    this.service.getReviews(product.id).subscribe((reviews: any[]) => {
      const dialogRef = this.dialog.open(ReviewModalComponent, {
        width: '600px',
        data: { reviews: reviews }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }

  closeReviewPopup() {
    this.reviewPopupVisible = false;
    this.selectedProductReviews = [];
    this.selectedProduct = null;
  }

  openPopup(product: Product) {
    this.currentProduct = product;
    this.popupVisible = true;
  }

  
}