import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import {throwError,BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  User: User={
  
    fullName:"",
    email:"",
    password:""
  };

  constructor(private http:HttpClient) { }
  register(user:User){
    return this.http.post(environment.apiBaseUrl+'/user/register',user).pipe(catchError(this.handleError))
  }
  login(user){
    return this.http.post(environment.apiBaseUrl+'/user/login',{email:user.email,password:user.password}).pipe(catchError(this.handleError))
  }
  getAccessToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  
  }
  setToken(token:string){
    localStorage.setItem('token',token);
  }
 private deleteToken(){
    localStorage.removeItem('token');
    
  }
  getUserPayload(){
    var token=this.getAccessToken()
    if(token){
      var userPayLoad=atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
    else
     return false;
  }
  logOut(){
    this.deleteToken();
    localStorage.removeItem('name')
    setTimeout(()=>{window.location.reload()},1000);
  }
  handleError(error:HttpErrorResponse){
    let msg='';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
      }
  }
  


