import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutpageGuard implements CanActivate {
  constructor(private router:Router){}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let cartdetailsfount:any = localStorage.getItem('cart');
    let details = JSON.parse(cartdetailsfount);

    if(details.length > 0)
    {
      return true;
    }

    return this.router.navigate(['/shop'])
    
   
  }
  
}
