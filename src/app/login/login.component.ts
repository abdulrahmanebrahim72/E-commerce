import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormControl , FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}


  signInForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]{5,15}/)]),
  });


  isLoading:boolean = false;
  errMessage:any ="";

  logIn(inputValues:FormGroup){
    this.isLoading = true;
    
    this._AuthService.signIn(inputValues.value).subscribe({
      next:(response)=>
      {
        if(response.message == "success"){
          sessionStorage.setItem("userToken" , response.token);
          this._AuthService.deCodedUserData();
          this._Router.navigate(["/home"]);
          this.isLoading = false;
        }
      },
      error:(err)=>
      {
        this.isLoading = false;
        this.errMessage = err.error?.message;
      },
    });
  }
}
