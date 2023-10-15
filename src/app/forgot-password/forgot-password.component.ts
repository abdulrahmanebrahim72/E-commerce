import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  forgotPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  });

  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required])
  });

  errMessage:string = '';
  successMessage:string = '';

  forgotPass(data:any){
    
    this._AuthService.forgotPassword(data.value).subscribe({
      next:(response) => {
        this.successMessage = response.message;
        this.errMessage = '';
        document.querySelector('.forgotPassword')?.classList.add('d-none');
        document.querySelector('.resetCode')?.classList.remove('d-none');
      },
      error:(err) => {
        this.errMessage = err.error.message;
      }
    });
  }

  verifyCode(data:any){

    this._AuthService._verifyCode(data.value).subscribe({
      next:(response) => {
        if(response.status == 'Success'){
          this._Router.navigate(['/resetPass'])
        }
      },
      error:(err) => {
        this.successMessage = '';
        this.errMessage = err.error.message;
      }
    });
  }

}
