import { Component, OnInit } from '@angular/core';
import { EcommerceDataService } from '../services/ecommerceData.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{

  constructor(private _EcommerceDataService:EcommerceDataService){}

  ngOnInit(): void {
    this.getBrandData();
  }

  brandData:any[] = [];
  pageSize:number = 0;
  curentPage:number = 1;
  total:number = 0;

  getBrandData(pageNum:number = 1){
    this._EcommerceDataService.getAllBrands(pageNum).subscribe((response)=>
    {
      this.brandData = response.data;
      this.pageSize = response.metadata.limit;
      this.curentPage = response.metadata.currentPage;
      this.total = response.results;
    });
  }

  displaySpecificBrand(brandId:string){
    this._EcommerceDataService.getSpecificBrand(brandId).subscribe({
      next:(response) => 
      {
        Swal.fire({
          title:response.data.name,
          color:'#0aad0a',
          imageUrl: response.data.image,
          imageHeight: 200,
          imageAlt: 'Brand image',
          showConfirmButton:false,
          showCancelButton:true
        })
      }
    });
  }

  pageChanged(event:any){
    this.getBrandData(event);
  }

}
