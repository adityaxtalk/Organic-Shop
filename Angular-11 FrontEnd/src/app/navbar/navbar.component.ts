import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {UserService} from '../services/user.service'
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  shoppingCartItemCount:number;
  user:string=localStorage.getItem('name')||'user';
  constructor(private shoppingCartService:ShoppingCartService,public userService:UserService) { }
  isAdmin:boolean=false
  ngOnInit(): void {
    this.shoppingCartService.getCart().subscribe((cart:any)=>{
      this.shoppingCartItemCount=0
      for (var item of cart){
      
        this.shoppingCartItemCount+=item.CartItem.quantity;
      }
      if(localStorage.getItem('role')==='Admin'){
        this.isAdmin=true
      }
    })
    
  }
  logout(){
    this.userService.logOut();
  }


}
