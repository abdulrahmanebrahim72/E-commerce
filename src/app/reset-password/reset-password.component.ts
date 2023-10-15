import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}


  resetPassForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z][0-9]{5,15}/)]),
  });


  isLoading:boolean = false;
  errMessage:string ="";

  resetPassword(inputValues:FormGroup){
    this.isLoading = true;
    
    this._AuthService._resetPassword(inputValues.value).subscribe({
      next:(response)=>
      {
        this.isLoading = false;
        this._Router.navigate(["/login"]);
      },
      error:(err)=>
      {
        this.errMessage = err.error.message;
        this.isLoading = false;
      }
    });
  }

}
