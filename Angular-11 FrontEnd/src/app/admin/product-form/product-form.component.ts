import { Component,OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {ActivatedRoute, Router} from '@angular/router'
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories:Category[];
  product:Product={
    id:undefined,
    title:"",
    price:undefined,
    category:"",
    imageUrl:""
  };
  id;
  constructor(private route:ActivatedRoute,private router:Router,private productService:ProductService,private categoryService:CategoryService) {
    this.categoryService.getAll().subscribe((data:Category[])=>{
      this.categories=data;
    });
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe((p:Product)=>this.product=p)
   }
   save(product){
     console.log("In save")
     if(this.id) 
      this.productService.update(this.id,product).subscribe(data=>{console.log(data);
         }) 
     else
       this.productService.create(product).subscribe(data=>console.log(data))
     this.router.navigate(['/admin/products']);
     
   }
   delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id).subscribe(data=>console.log(data));
    this.router.navigate(['/admin/products']);
  }

  
  ngOnInit(): void {
    
  }
  
}
