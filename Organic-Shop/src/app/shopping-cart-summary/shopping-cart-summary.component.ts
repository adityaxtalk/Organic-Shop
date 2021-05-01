import { Component, OnInit,Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  cart:any
  constructor(private shoppingCartService:ShoppingCartService) { }
  cartCount:number
  totalPrice:any
  ngOnInit(): void {
    this.shoppingCartService.getCart().subscribe(cart=>{
      this.cartCount=0
      this.totalPrice=0;
      this.cart=cart;
      console.log(this.cart)
      for(var item of this.cart){
         this.cartCount+=item.CartItem.quantity;
         this.totalPrice+=item.CartItem.quantity*item.price;
      }
    });
  }
  
}
