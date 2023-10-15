import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  
  constructor() {}

  isLoading1 = new Subject<boolean>();

  show() {
     this.isLoading1.next(true);
  }

  hide() {
     this.isLoading1.next(false);
  }

}
