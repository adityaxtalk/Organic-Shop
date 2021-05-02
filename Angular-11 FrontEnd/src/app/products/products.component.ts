import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import {switchMap} from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
products:Product[]=[];

filteredProduct:Product[];
category:string;
cart:any;
subscription:Subscription;
  constructor(route:ActivatedRoute,productService:ProductService, categoryService:CategoryService,private shoppingCart:ShoppingCartService) { 
    productService.getAll().pipe(switchMap((products:Product[])=>{
      this.products=products;
      return route.queryParamMap;})).subscribe(params=>{
        this.category=params.get('category');
        this.filteredProduct=(this.category)?this.products.filter(p=>p.category===this.category):this.products;
      })
      
    
    
  }

 async ngOnInit() {
   this.subscription=(await this.shoppingCart.getCart())
    .subscribe(cart=>this.cart=cart);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
