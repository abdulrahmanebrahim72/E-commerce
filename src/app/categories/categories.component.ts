import { EcommerceDataService } from './../services/ecommerceData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  constructor(private _EcommerceDataService:EcommerceDataService){}

  ngOnInit(): void {
      this.getCategories();
  }
  
  categoryData:any[] = [];

  getCategories(){
    this._EcommerceDataService.getAllCategories().subscribe({
      next:(response) => 
      {
        this.categoryData = response.data;
      }
    });
  }

}
