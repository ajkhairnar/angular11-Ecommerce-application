import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {CheckoutpageGuard } from '../_auth/checkoutpage.guard';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { ConfirmedGuard } from '../_auth/confirmed.guard';
const routes: Routes = [
  {
    path:'',
    component:CartComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    canActivate:[CheckoutpageGuard]
  },{
    path:'confirm',
    component:ConfirmedComponent,
    canActivate:[ConfirmedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartmoduleRoutingModule { }
