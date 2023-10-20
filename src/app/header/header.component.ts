import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemsCount!: number

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartItemsCount = this.cartService.getCartItemsCount();
  }

}
