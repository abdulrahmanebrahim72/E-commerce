import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceDataService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/`;

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}categories`);
  }

  getAllBrands(pageNum:number = 1):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}brands?page=${pageNum}&limit=16`);
  }

  getSpecificBrand(brandId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}brands/${brandId}`);
  }

  getSpecificCategory(catId:string | null):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}categories/${catId}`);
  }

  getAllSubCategoriesOnCategory(catId:string | null):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}categories/${catId}/subcategories`);
  }

  getAllProducts(pageNum:number = 1):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}products?page=${pageNum}&limit=16`);
  }

  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl+"products/"+id);
  }
  
  getUserOrders(uId:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl+"orders/user/"+uId);
  }

}
