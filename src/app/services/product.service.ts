import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone Case',
      description:
        'A sleek, protective case for your smartphone, available in various colors and designs.',
      productImageUrl: 'https://picsum.photos/id/1/200',
      totalQuantity: 5,
      quantityLeft: 5,
      price: 129.99,
    },
    {
      id: 2,
      name: 'Coffee Maker',
      description:
        'A high-quality machine that brews your favorite coffee at home with customizable settings.',
      productImageUrl: 'https://picsum.photos/id/2/200',
      totalQuantity: 4,
      quantityLeft: 4,
      price: 139.99,
    },
    {
      id: 3,
      name: 'Running Shoes',
      description:
        'Comfortable athletic footwear with excellent support for running and other physical activities.',
      productImageUrl: 'https://picsum.photos/id/3/200',
      totalQuantity: 7,
      quantityLeft: 7,
      price: 109.99,
    },
    {
      id: 4,
      name: 'Leather Handbag',
      description:
        'A stylish and durable bag made from genuine leather, perfect for everyday use.',
      productImageUrl: 'https://picsum.photos/id/4/200',
      totalQuantity: 3,
      quantityLeft: 3,
      price: 99.99,
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      description:
        'A portable speaker that connects wirelessly to your devices, delivering impressive sound quality.',
      productImageUrl: 'https://picsum.photos/id/5/200',
      totalQuantity: 5,
      quantityLeft: 5,
      price: 219.99,
    },
    {
      id: 6,
      name: 'Fitness Tracker',
      description:
        'A wearable device that monitors your daily activity, heart rate, and sleep patterns.',
      productImageUrl: 'https://picsum.photos/id/6/200',
      totalQuantity: 5,
      quantityLeft: 5,
      price: 329.99,
    },
    {
      id: 7,
      name: 'Ceramic Cookware Set',
      description:
        'A set of non-stick ceramic pots and pans for a healthier cooking experience.',
      productImageUrl: 'https://picsum.photos/id/7/200',
      totalQuantity: 5,
      quantityLeft: 5,
      price: 299.99,
    },
    {
      id: 8,
      name: 'E-Book Reader',
      description:
        'An electronic device for reading digital books, with a glare-free screen and extended battery life.',
      productImageUrl: 'https://picsum.photos/id/8/200',
      totalQuantity: 2,
      quantityLeft: 2,
      price: 119.99,
    },
    {
      id: 9,
      name: 'Sunglasses',
      description:
        ' Fashionable UV-protective eyewear that complements your style while shielding your eyes from the sun.',
      productImageUrl: 'https://picsum.photos/id/9/200',
      totalQuantity: 2,
      quantityLeft: 2,
      price: 599.99,
    },
    {
      id: 10,
      name: 'Tent',
      description:
        'A durable and spacious shelter for outdoor camping adventures, easy to set up and weather-resistant.',
      productImageUrl: 'https://picsum.photos/id/10/200',
      totalQuantity: 2,
      quantityLeft: 2,
      price: 149.99,
    },
    {
      id: 11,
      name: 'Digital Camera',
      description:
        'A high-resolution camera for capturing stunning photos and videos with various shooting modes.',
      productImageUrl: 'https://picsum.photos/id/11/160/160',
      totalQuantity: 2,
      quantityLeft: 2,
      price: 399.99,
    },
    {
      id: 12,
      name: 'Electric Toothbrush',
      description:
        'A modern toothbrush that provides efficient oral hygiene with multiple brushing modes and a timer.',
      productImageUrl: 'https://picsum.photos/id/12/60/60',
      totalQuantity: 2,
      quantityLeft: 2,
      price: 129.99,
    },
  ];

  private cart = new BehaviorSubject<Array<Product>>([]);
  public cart$ = this.cart.asObservable();


  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  getCartItems() {
    return this.cart$;
  }

  getCartTotal() {
    return this.cart.value.reduce(
      (acc, item) => acc + item.totalQuantity * item.price,
      0
    );
  }

  clearCart() {
    this.cart.value.forEach((item) => {
      const product = this.getProductById(item.id);
      product && (product.quantityLeft = product.totalQuantity);
    });

    this.cart.next([]);
  }

  manageCartItemQuantity(id: number, increaseQty = 1) {
    const product = this.getProductById(id);

    if (!product) return;

    for (const item of this.cart.value) {
      if (item.id === id) {
        increaseQty == 1 &&
          product.quantityLeft > 0 &&
          product.quantityLeft-- &&
          item.totalQuantity++;
        increaseQty === -1 && item.totalQuantity-- && product.quantityLeft++;
      }
    }

    const cartItems = this.cart.value.filter((item) => item.totalQuantity > 0);
    this.cart.next(cartItems);
  }

  addProductToCart(id: number) {
    const cartProduct = this.cart.value.find((item) => item.id === id);
    const product = this.getProductById(id);

    if (!product) return;

    if (product.totalQuantity > product.quantityLeft) {
      const removedCartItem = this.cart.value.find((item) => item.id === id);

      if (!removedCartItem) return;
      product.quantityLeft += removedCartItem?.totalQuantity;
      const cartItems = this.cart.value.filter(item => item.id != id);
      this.cart.next(cartItems);
      return;
    }

    if (cartProduct) {
      cartProduct.totalQuantity++;
      product.quantityLeft--;
    } else {
      const cartItems = this.cart.value;
      cartItems.push({ ...product, totalQuantity: 1 });
      this.cart.next(cartItems);
      product.quantityLeft--;
    }
  }
}
