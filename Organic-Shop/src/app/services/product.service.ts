import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get(environment.apiBaseUrl+'/products/');
  }
  create(data){ 
    return this.http.post(environment.apiBaseUrl+'/products',data)
  }
  get(productId){
    return this.http.get(environment.apiBaseUrl+'/products/'+productId)
  }
  update(productId,product){
    return this.http.put(environment.apiBaseUrl+'/products/editProduct/'+productId,product)
  }
  delete(productId){
    return this.http.delete(environment.apiBaseUrl+'/products/'+productId);
  }
}
