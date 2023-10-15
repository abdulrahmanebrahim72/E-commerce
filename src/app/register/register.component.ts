import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z][0-9]{5,10}/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z][0-9]{5,15}/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(002)?01[0125][0-9]{8}$/gm)])}
    ,{validators:this.rePasswordMatch}
  );

  rePasswordMatch(form:any){
    let pass = form.controls['password']; //first way to get form control
    let rePass = form.controls['rePassword'];  //secound way to get form control form.get('rePassword')
    if(pass.value === rePass.value){
      return null;
    }else{
      rePass.setErrors({repasswordmatch: "rePassword not matched"});
      return {repasswordmatch: "rePassword not matched"}
    }
  }


  isLoading:boolean = false;
  errMessage:any ="";

  Register(inputValues:FormGroup){
    this.isLoading = true;
    
    this._AuthService.signUp(inputValues.value).subscribe({
      next:(response)=>
      {
        console.log(response);
        this.isLoading = false;
        this._Router.navigate(["/login"]);
      },
      error:(err)=>
      {
        this.errMessage = err.error?.message;
        this.isLoading = false;
      }
    });
  }

}
