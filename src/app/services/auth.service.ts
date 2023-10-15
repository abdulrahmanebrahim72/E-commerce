import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { 
    if(sessionStorage.getItem("userToken") != null){
      this.deCodedUserData();
    }
  }

  baseUrl:string = 'https://ecommerce.routemisr.com'
  userId:string = '';

  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,data);
  }
  signIn(data:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,data);
  }

  userTokenDeCoded = new BehaviorSubject(null);

  deCodedUserData(){
    let enCodedToken:any = JSON.stringify(sessionStorage.getItem("userToken"));
    let deCodedToken:any = jwtDecode(enCodedToken);

    this.userTokenDeCoded.next(deCodedToken);

    this.userId = JSON.parse(JSON.stringify(deCodedToken)).id;
  }

  logOut(){
    this.userTokenDeCoded.next(null);
    sessionStorage.removeItem("userToken");
  }

  forgotPassword(data:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,data);
  }
  _verifyCode(data:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,data);
  }
  _resetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,data);
  }
  changePassword(data:object):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/changeMyPassword`,data);
  }
  UpdateUserData(data:object):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/updateMe`,data);
  }



}
