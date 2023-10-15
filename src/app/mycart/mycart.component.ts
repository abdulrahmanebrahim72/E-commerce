import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddheadersInterceptor } from '../interceptors/addheaders.interceptor';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss'],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:AddheadersInterceptor,
    multi:true
  },]
})
export class MycartComponent implements OnInit{

  constructor(private _CartService:CartService){}

  ngOnInit(): void {
    this.displayCart()
  }

  allProducts:any = {};

  displayCart(){
    this._CartService.getLoggedUserCart().subscribe({
      next:(response) => 
      {
        this.allProducts = response.data;
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
      }
    });
  }

  removeSpecificCartItem(pId:string){
    this._CartService._removeSpecificCartItem(pId).subscribe({
      next:(response) => 
      {
        this.allProducts = response.data;
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
      }
    });
  }

  updateProductCount(pId:string , _count:number){
    this._CartService._updateProductCount(pId , _count).subscribe({
      next:(response) => 
      {
        this.allProducts = response.data;
        if(_count < 1){
          this.removeSpecificCartItem(pId)
        }
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
      }
    });
  }


  clearUserCart(){
    this._CartService.clearCart().subscribe({
      next: _ => 
      {
        this.allProducts = {}
      }
    });
  }

}
