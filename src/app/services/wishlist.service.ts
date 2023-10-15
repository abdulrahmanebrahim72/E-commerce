import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService implements OnInit{

  numberOfWishListItems = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) { }

  ngOnInit(): void {
      this.getLoggedUserWishList().subscribe({
        next:(response) => 
        {
          this.numberOfWishListItems.next(response.count)
        }
      });
  }

  baseUrl:string = 'https://ecommerce.routemisr.com';

  _addToWishList(pId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
    {
      productId:pId
    });
  }

  getLoggedUserWishList():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`);
  }

  _removeWishListItem(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${pId}`);
  }
}

