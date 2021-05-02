import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(public http:HttpClient ) { }

  public create(productId){
    let cartId=localStorage.getItem('cartId');
    if(!cartId){
      cartId="0";
    }
    return this.http.post(environment.apiBaseUrl+'/cart/',{id:productId,cartId:cartId});
  }
  getCart(){
    let cartId=localStorage.getItem('cartId');
    if(!cartId){
        cartId="0";
    }
    return this.http.get(environment.apiBaseUrl+'/cart/'+cartId);
  }
  removeFromCart(prodId){
    let cartId=localStorage.getItem('cartId');
    if(!cartId){
      cartId="0";
  }
    return this.http.put(environment.apiBaseUrl+'/cart/',{id:prodId,cartId:cartId});
  }
  clearCart(productId){
    let cartId=localStorage.getItem('cartId');
    console.log(`${environment.apiBaseUrl}/cart/delete/${cartId}/${productId}`);
    return this.http.delete(`${environment.apiBaseUrl}/cart/delete/${cartId}/${productId}`);
  }   
  
  
}
