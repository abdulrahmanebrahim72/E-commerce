import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  errMessage:any ="";

  changePasswordForm:FormGroup = new FormGroup({
    currentPassword:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]{5,15}/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]{5,15}/)]),},
    {validators:this.rePasswordMatch}
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

  changePass(inputValues:FormGroup){
    this._AuthService.changePassword(inputValues.value).subscribe({
      next:() => 
      {
        sessionStorage.removeItem("userToken"); 
        this._Router.navigate(["/login"]);
      },
      error:(err) => 
      {
        this.errMessage = err.error?.errors?.msg;
      }
    });
  }
  
}
