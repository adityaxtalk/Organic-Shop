import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getOrders(){
    return this.http.get(`${environment.apiBaseUrl}/order/`);
  }
  storeOrder(shipping,cartId){
  return this.http.post(`${environment.apiBaseUrl}/order/`,{shipping:shipping,cartId});
  }
  getOrderById(){
    return this.http.get(`${environment.apiBaseUrl}/order/id`)
  }
}
