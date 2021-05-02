import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  constructor(private cartService:ShoppingCartService,private router:Router) { }
  @Input('product') product:Product;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart;
  
  reloadComponent() {
    
  
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/'],{queryParamsHandling:'preserve'});
    }
  addToCart(){
    this.cartService.create(this.product.id).subscribe((result:any)=>{
      localStorage.setItem('cartId',result.cartId)
      console.log(result)
      this.reloadComponent()
    })
    
  }
  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item=this.shoppingCart.filter(p=>this.product.id===p.CartItem.ProductId)
    return item.length>0?item[0].CartItem.quantity:0
    
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product.id).subscribe((result:any)=>{
      console.log(result)
      this.reloadComponent()
    });
    
  }
  ngOnInit(){

  }

}
