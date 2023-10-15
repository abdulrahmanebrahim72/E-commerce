import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommerceDataService } from '../services/ecommerceData.service';
import { OwlOptions  } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  productId:any;
  productDetails:any;
  wishListData:any[] = [];

  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _EcommerceDataService:EcommerceDataService,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
    ){
    this._ActivatedRoute.paramMap.subscribe((parameters) => 
    {
      this.productId = parameters.get('_id');
    }
    );
  }

  ngOnInit(): void {
    this._getProductDetails()
  }

  _getProductDetails(){
    this._EcommerceDataService.getProductDetails(this.productId).subscribe((response)=>
    {
      this.productDetails = response.data;
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
              confirmButtonColor:"#49AD0A",
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

  addToFav(pId:string){
    this._WishlistService._addToWishList(pId).subscribe({
      next:(response) => 
      {  
        this._WishlistService.numberOfWishListItems.next(response.data.length);
        if(response.status == "success"){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${response.message}`,
            showConfirmButton: true,
            confirmButtonColor:"#49AD0A",
            timer: 3000
          })
        }
        this.wishListData = response.data;
      },
      error:(err) => {console.log(err);
      }
    });
  }

  removeWishListItem(pId:string){
    this._WishlistService._removeWishListItem(pId).subscribe({
      next:(response) => 
      {
        this._WishlistService.numberOfWishListItems.next(response.data.length);
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
      }
    });
  }

  //carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:900,
    nav: true,
    navText: ['<i class="fa-solid fa-circle-arrow-left fs-4 text-main iconScale"></i>' , '<i class="fa-solid fa-circle-arrow-right fs-4 text-main iconScale"></i>'],
    responsive: {
      0: {
        items: 1
      }
    }
  }

}
