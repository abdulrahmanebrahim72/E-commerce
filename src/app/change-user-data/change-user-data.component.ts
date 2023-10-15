import { response } from 'express';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-user-data',
  templateUrl: './change-user-data.component.html',
  styleUrls: ['./change-user-data.component.scss']
})
export class ChangeUserDataComponent {

  constructor(private _AuthService:AuthService){}

  errMessage:any ="";
  sucMessage:any ="";

  updateDataForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(002)?01[0125][0-9]{8}$/gm)]),
  });

  updateData(inputValues:FormGroup){
    this._AuthService.UpdateUserData(inputValues.value).subscribe({
      next:(response) => 
      {
        this.sucMessage = response.message;
        this.errMessage = '';
      },
      error:(err) => 
      {
        this.errMessage = err.error?.errors?.msg;
        this.sucMessage = '';
      }
    });
  }


}
