import { BehaviorSubject, Observable } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable, OnInit, NgModule } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class CartService implements OnInit{

  numberOfCartItems = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) {}

  ngOnInit(): void {
    this.getLoggedUserCart().subscribe({
      next:(response) => {this.numberOfCartItems.next(response.numOfCartItems)}
    });
  }

  baseUrl:string = 'https://ecommerce.routemisr.com';
  //headers:any = {token:sessionStorage.getItem('userToken')}

  _addToCart(pId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
    {
      productId:pId
    });
  }
  
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`);
  }


  _removeSpecificCartItem(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${pId}`);
  }


  _updateProductCount(pId:string , _count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${pId}`,
    {
      count:_count
    });
  }

  handlePayment(cId:string , _shippingAddress:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200`,
    {
      shippingAddress:_shippingAddress
    });
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`);
  }
}
