import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmedGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let payid:any = localStorage.getItem('payid');
    let details = JSON.parse(payid);

    if(details.length > 0)
    {
      return true;
    }

    return this.router.navigate(['/shop'])
  }
  
}
