import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartmoduleRoutingModule } from './cartmodule-routing.module';
import { CartComponent } from './cart/cart.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmedComponent } from './confirmed/confirmed.component'


@NgModule({
  declarations: [CartComponent, CheckoutComponent, ConfirmedComponent],
  imports: [
    CommonModule,
    CartmoduleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartmoduleModule { }
