import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular7-data-table';

import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products:Product[];
  subscription:Subscription;
  tableResource:DataTableResource<Product>;
  items:Product[]=[];
  itemCount:number;
  limit:number
  constructor(private productService:ProductService) {
    this.subscription=this.productService.getAll().subscribe(products=>{
      this.products=<Product[]>products;
      this.initialize(<Product[]>products)
    })
    this.limit=10;
   }
   private initialize(products:Product[]){
     this.tableResource=new DataTableResource(products);
     this.tableResource.query({offset:0}).then(items => this.items=items);
     this.tableResource.count().then(count=>this.itemCount=count);
   }
   reloadItems(params){
     if(!this.tableResource) return;
     this.tableResource.query(params).then(items=>{
       this.items=items;
     })
   }
   filter(query:string){
     let filteredProducts=(query) ?
     this.products.filter(p=> (p.title).toLowerCase().includes(query.toLowerCase())) : 
     this.products;
     this.initialize(filteredProducts);
   }
  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
