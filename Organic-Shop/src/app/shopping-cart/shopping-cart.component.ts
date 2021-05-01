import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart;
  cartCount:number;
  totalPrice:number;
  constructor(private shoppingCartService:ShoppingCartService) { }
  addToCart(productId){
    this.shoppingCartService.create(productId).subscribe((result:any)=>{
      localStorage.setItem('cartId',result.cartId)
      console.log(result)
    })
  }
  
  removeFromCart(productId){
    this.shoppingCartService.removeFromCart(productId).subscribe(result=>{
      console.log(result);
    });
  }
  ngOnInit() {
    this.shoppingCartService.getCart().subscribe(cart=>{
      this.cartCount=0;
      this.totalPrice=0;
      this.cart=cart;
      console.log(this.cart)
      for(var item of this.cart){
         this.cartCount+=item.CartItem.quantity;
         this.totalPrice+=item.CartItem.quantity*item.price;
      }
    });
    
  }
  clearCart(productId){
    this.shoppingCartService.clearCart(productId).subscribe(result=>console.log(result));
  }

}
