import { WishlistService } from './../services/wishlist.service';
import { CartService } from './../services/cart.service';
import { AuthService } from './../services/auth.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{

  constructor(private _AuthService: AuthService,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService,
    ) {}

  @ViewChild('navEl') navElement!:ElementRef


  
  @HostListener('window:scroll')
  onScroll(){
    if(scrollY > 400){
      this._Renderer2.addClass(this.navElement.nativeElement , 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement , 'shadow');
    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement , 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement , 'shadow');
    }
  }
  
  scrollToTop(){
    window.scrollTo(0,0);
  }
  
  
  ngOnInit(): void {
    this._CartService.numberOfCartItems.subscribe({
      next:(response) => {this.cartNumber = response}
    });
    
    this._CartService.getLoggedUserCart().subscribe({
      next:(response) => {this.cartNumber = response.numOfCartItems}
    });

    this._WishlistService.numberOfWishListItems.subscribe({
      next:(response) => {this.wishListNumber = response}
    });
    
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:(response) => {this.wishListNumber = response.count}
    });

    this._AuthService.userTokenDeCoded.subscribe({
      next: _ => {
        if (this._AuthService.userTokenDeCoded.getValue() != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  
  isLogin: boolean = false;
  cartNumber:number = 0;
  wishListNumber:number = 0;
  
  logOutPressed(){
    this._AuthService.logOut();
  }
}
