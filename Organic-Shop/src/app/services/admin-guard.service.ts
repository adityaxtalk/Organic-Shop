import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router'
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  canActivate(){
    const role=localStorage.getItem('role');
    if(role==='Admin')
     return true;
     else
     {
        false;
     }
  }
  constructor(private user:UserService) { }
}
