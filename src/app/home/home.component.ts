import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products!: Product[];
  cartItems: Product[] = [];

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.getCartItems().subscribe({
      next: (cartItmes: Product[]) => this.cartItems = cartItmes
    })
  }

  handleAddToCart(id: number) {
    this.productService.addProductToCart(id);
  }

  // handleAddToCart(id: number) {
  //   const cartProduct = this.cartItems.find((item) => item.id === id);
  //   const product = this.productService.getProductById(id);

  //   if (!product || product.quantityLeft < 1) return;

  //   if (product.totalQuantity > product.quantityLeft) {
  //     const removedCartItem = this.cartItems.find((item) => item.id === id);

  //     if (!removedCartItem) return;
  //     product.quantityLeft += removedCartItem?.totalQuantity;
  //     this.cartItems.splice(
  //       this.cartItems.findIndex((item) => item.id === id),
  //       1
  //     );
  //     return;
  //   }

  //   if (cartProduct) {
  //     cartProduct.totalQuantity++;
  //     product.quantityLeft--;
  //   } else {
  //     this.cartItems.push({ ...product, totalQuantity: 1 });
  //     product.quantityLeft--;
  //   }
  // }

  getCartTotal() {
    return this.productService.getCartTotal();
  }

  clearCart() {
    this.productService.clearCart();
  }

  manageQuantity(id: number, increaseQty = 1) {
    this.productService.manageCartItemQuantity(id, increaseQty);
  }
}
