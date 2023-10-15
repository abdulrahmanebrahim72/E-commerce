import { response } from 'express';
import { ActivatedRoute } from '@angular/router';
import { EcommerceDataService } from './../services/ecommerceData.service';
import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit{

  constructor(private _EcommerceDataService:EcommerceDataService,
    private _ActivatedRoute:ActivatedRoute
    ){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params) => 
      {
        this.catId = params.get('_id');
      }
    });

    this.displayCategoryDetails(this.catId);
    this.displaySubCategories(this.catId);
  }

  categoryDetailsData:any = {};
  allSubCategoriesOnCategory:any[] = [];
  catId:string | null = '';

  displayCategoryDetails(cId:string | null){
    this._EcommerceDataService.getSpecificCategory(cId).subscribe({
      next:(response) => 
      {
        this.categoryDetailsData = response.data;
      }
    });
  }

  displaySubCategories(cId:string | null){
    this._EcommerceDataService.getAllSubCategoriesOnCategory(cId).subscribe({
      next:(response) => 
      {
        this.allSubCategoriesOnCategory = response.data;
      }
    });
  }

}
