import { CartService } from './../services/cart.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EcommerceDataService } from '../services/ecommerceData.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    private _EcommerceDataService:EcommerceDataService,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
    ) {}

  ngOnInit():void {
    this.getCategoryData();
    this.getBrandData();
    this.getProductData();
    this.getWishListData();
  }

  categoryData:any[] = [];
  brandData:any[] = [];
  productData:any[] = [];
  wishListData:any[] = [];
  searchValue:string = '';


  getCategoryData(){
    this._EcommerceDataService.getAllCategories().subscribe((response)=>
    {
      this.categoryData = response.data;
    });
  }

  getBrandData(){
    this._EcommerceDataService.getAllBrands().subscribe((response)=>
    {
      this.brandData = response.data.slice(0,4);
    });
  }

  getProductData(){
    this._EcommerceDataService.getAllProducts().subscribe((response)=>
    {
      this.productData = response.data.slice(0,20);
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
        error:() => 
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

  getWishListData(){
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:(response) => 
      {
        const newWishListData = response.data.map((item:any) => {return item._id});
        this.wishListData = newWishListData;
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
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    nav: true,
    navText: ['' , ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  }
}
