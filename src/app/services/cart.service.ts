import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from './product.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Product[] = [];
  private cart = new BehaviorSubject<Array<Product>>([]);
  public cart$ = this.cart.asObservable();

  constructor(private productService: ProductService) {}

  // getCartItems() {
  //   return this.cart$;
  // }

  addProductToCart(id: number) {
    const cartArray = this.cart.value;

    const cartProduct = cartArray.find((item) => item.id === id);
    const product = this.productService.getProductById(id);

    if (!product || product.quantityLeft < 1) return;

    if (cartProduct) {
      product.quantityLeft -= 1;
      cartProduct.quantityLeft += 1;
      this.cart.next(cartArray);
    } else {
      cartArray.push({ ...product, totalQuantity: 1 });
      product.quantityLeft -= 1;
      this.cart.next(cartArray);
    }

    // const cartProduct = this.cartItems.find((item) => item.id === id);
    // const product = this.productService.getProductById(id);

    // if (!product || product.quantity < 1) return;

    // if (cartProduct) {
    //   product.quantity -= 1;
    //   cartProduct.quantity += 1;
    // } else {
    //   this.cartItems.push({ ...product, quantity: 1 });
    //   product.quantity -= 1;
    //   console.log('cartItems in cartServices: ', this.cartItems);
    // }
  }

  getCartTotal(): number {
    return this.cart.value.reduce(
      (acc, obj) => acc + obj.totalQuantity * obj.price,
      0
    );
  }

  getCartItemsCount(): number {
    return this.cart.value.reduce((acc, obj) => acc + obj.totalQuantity, 0);
  }
}
