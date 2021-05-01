import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSuccessMessage:boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  serverErrorMessage:string;
  constructor(public userService:UserService) { }
  onSubmit(form:NgForm){
    this.userService.register(form.value).subscribe(
      res=>{ 
        this.showSuccessMessage=true
        console.log(res)
        setTimeout(()=>{this.showSuccessMessage=false},4000)
      },
      err=>{
        if(err.status===500)
        {
          this.serverErrorMessage="User is already registered";
          
        }
        else{
          this.serverErrorMessage=err;
        }
      }
      );

  }
  ngOnInit(): void {
  }

}
