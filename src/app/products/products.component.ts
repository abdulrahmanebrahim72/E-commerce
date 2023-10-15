import { Component, OnInit, Renderer2 } from '@angular/core';
import { EcommerceDataService } from '../services/ecommerceData.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(
    private _EcommerceDataService:EcommerceDataService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2,
    private _CartService:CartService
    ){}

  ngOnInit(): void {
    this.getProductData();
    this.getWishListData();
  }

  productData:any[] = [];
  wishListData:any[] = [];
  pageSize:number = 0;
  curentPage:number = 1;
  total:number = 0;

  getProductData(pageNum:number = 1){
    this._EcommerceDataService.getAllProducts(pageNum).subscribe({
      next:(response)=>
      {
        this.productData = response.data;
        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;
      }
    })
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

  pageChanged(event:any){
    this.getProductData(event);
  }

}
