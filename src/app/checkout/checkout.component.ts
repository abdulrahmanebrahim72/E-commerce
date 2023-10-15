import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  constructor(private _CartService:CartService){}

  cartIdL:string = '';
  ngOnInit(): void {
      this._CartService.getLoggedUserCart().subscribe({
        next:(response) => {this.cartIdL = response.data._id}
      });
  }

  payment:FormGroup = new FormGroup({
    details: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required]),
    city: new FormControl(null,[Validators.required])
  });

  navigateToPaymentPage(url:string){
    location.href = url;
  }


  onlinePayment(payment:FormGroup){
    this._CartService.handlePayment(this.cartIdL , payment.value).subscribe({
      next:(response) => 
      {
        if(response.status == "success"){
          this.navigateToPaymentPage(response.session.url);
        }
      },
      error:(err) => {console.log(err)}
    });
  }
}
