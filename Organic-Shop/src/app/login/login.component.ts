import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  config:{
    name:string;
    userId:string;
    token:string;
  }
  data={
    email:'',
    password:'',
    token:''
  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public userService:UserService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.data.token=localStorage.getItem('token');
  }
  onSubmit(form:NgForm){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')||'/';
  
        this.userService.login(form.value).subscribe((data:any)=>{
          this.config={
            userId:data.user.id,
            name:data.user.fullName,
            token:data.token

          }
        
          localStorage.setItem('role',data.user.role)
          localStorage.setItem('name',this.config.name);
          this.userService.setToken(this.config.token);
          this.router.navigate([returnUrl])
        })
      }
    
  
}
