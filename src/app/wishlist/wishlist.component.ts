import { CartService } from './../services/cart.service';
import { WishlistService } from './../services/wishlist.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{

  constructor(
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2,
    private _CartService:CartService
    ){}

  ngOnInit(): void {
    this.displayWishList();
    this.getWishListData();
  }

  productData:any[] = [];
  wishListData:any[] = [];


  displayWishList(){
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:(response) => 
      {
        this.productData = response.data;
        this._WishlistService.numberOfWishListItems.next(response.count);
      }
    });
  }

  addToCart(pId:string , element:HTMLButtonElement){

    this._Renderer2.setAttribute(element , "disabled" , "true");

    this._CartService._addToCart(pId).subscribe(
      {
        next:(response) => 
        {
          this._CartService.numberOfCartItems.next(response.numOfCartItems);
          if(response.status == "success"){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${response.message}`,
              showConfirmButton: true,
              timer: 3000
            })
          }
          this._Renderer2.removeAttribute(element , "disabled");
        },
        error:(err) => 
        {
          this._Renderer2.removeAttribute(element , "disabled");
        }
      }
      );
  }

  // addToFav(pId:string){
  //   this._WishlistService._addToWishList(pId).subscribe({
  //     next:(response) => 
  //     {
  //       if(response.status == "success"){
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: `${response.message}`,
  //           showConfirmButton: true,
  //           timer: 3000
  //         })
  //       }
  //       this.wishListData = response.data;
  //       this._WishlistService.numberOfWishListItems.next(response.count);
  //     },
  //     error:(err) => {console.log(err);
  //     }
  //   });
  // }

  removeWishListItem(pId:string){
    this._WishlistService._removeWishListItem(pId).subscribe({
      next:(response) => 
      {
        if(response.status == "success"){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${response.message}`,
            showConfirmButton: true,
            timer: 3000
          })
        }
        this.wishListData = response.data;

        const newWishListData = this.productData.filter((item) => {
          return this.wishListData.includes(item._id)
        });

        this.productData = newWishListData;
        this._WishlistService.numberOfWishListItems.next(response.data.length);

      }
    });
  }

  getWishListData(){
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:(response) => 
      {
        const newWishListData = response.data.map((item:any) => {return item._id});
        this.wishListData = newWishListData;
        
      }
    });
  }

}
