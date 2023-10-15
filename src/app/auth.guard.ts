import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  let _Router = inject(Router);

  if(sessionStorage.getItem("userToken") != null){
    return true
  }
  else{
    _Router.navigate(['/login']);
    return true
  }
};
