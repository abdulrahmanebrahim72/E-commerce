import { EcommerceDataService } from './../services/ecommerceData.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit{

  constructor(private _AuthService:AuthService,
    private _EcommerceDataService:EcommerceDataService){}
    
  ngOnInit(): void {
      this.displayOrders();
  }

  userId:string = this._AuthService.userId;
  allUserOrders:any[] = [];
  
  displayOrders(){
    this._EcommerceDataService.getUserOrders(this.userId).subscribe({
      next:(response) => 
      {
        this.allUserOrders = response;
      }
    });
  }

}
