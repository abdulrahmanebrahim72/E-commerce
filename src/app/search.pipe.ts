import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[] , searchKey:string): any[] {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(searchKey.toLowerCase());
    });
  }

}
