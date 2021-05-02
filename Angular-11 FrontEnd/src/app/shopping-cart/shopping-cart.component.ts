import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private shoppingCartService:ShoppingCartService,private router:Router) { }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
  addToCart(productId){
    this.shoppingCartService.create(productId).subscribe((result:any)=>{
      localStorage.setItem('cartId',result.cartId)
      console.log(result)
      this.reloadComponent()
    })
  }
  
  removeFromCart(productId){
    this.shoppingCartService.removeFromCart(productId).subscribe(result=>{
      console.log(result);
      this.reloadComponent()
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
    this.shoppingCartService.clearCart(productId).subscribe(result=>{console.log(result)
      this.reloadComponent()
    });
  }

}
