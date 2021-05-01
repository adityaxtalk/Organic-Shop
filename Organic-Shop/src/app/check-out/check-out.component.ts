import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
 shipping={
   name:"",
   addressLine1:"",
   addressLine2:"",
   city:""
 };
 cart:any;
 subscription:Subscription;
  constructor(private shoppingCartService:ShoppingCartService,private orderService:OrderService) {  }

 async ngOnInit() {
   let cart$=await this.shoppingCartService.getCart()
  this.subscription=cart$.subscribe(cart=>this.cart=cart)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  placeOrder(){
    console.log(this.cart)
     const cartId=localStorage.getItem('cartId')
    this.orderService.storeOrder(this.shipping,cartId).subscribe(res=>{
      console.log(res)
    })
  }

}
