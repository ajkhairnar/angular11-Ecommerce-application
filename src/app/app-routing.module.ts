import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file/file.component';
import { HomeComponent } from './home/home.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ShopComponent } from './shop/shop.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path:'',
    component:ShopComponent
  },
  {
    path:'shop',
    component:ShopComponent
  },
  
  {
    path:'blog',
    loadChildren:()=>import('./blog/blog.module').then(mod => mod.BlogModule),
  },
  {
    path:'shop/:item/:id',
    component:ProductdetailsComponent
  },
  {
    path:'cart',
    loadChildren:() => import('./cartmodule/cartmodule.module').then(mod => mod.CartmoduleModule)
  },
  {
    path:'wishlist',
    component:WishlistComponent
  },
  {
    path:'file',
    component:FileComponent
  },
  { path: '**', redirectTo: 'shop', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
