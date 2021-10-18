import { Component, OnInit } from '@angular/core';
import { ProdserviceService} from '../../_services/prodservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartlistnavbar:any=[];
  cartlistnavbar_totalprice:any=0;
  constructor(  private productservice:ProdserviceService,
                private toastr:ToastrService,
                private router:Router
              ) { 
    if(localStorage.getItem("cart")== null)
    {
      localStorage.setItem("cart", JSON.stringify([]));
    }

    if(localStorage.getItem("applcouponcode") == null){
      localStorage.setItem("applcouponcode", JSON.stringify([]));
    }

    if(localStorage.getItem("payid") == null){
      localStorage.setItem("payid", JSON.stringify([]));
    }

    if(localStorage.getItem("wishlist") == null){
      localStorage.setItem("wishlist", JSON.stringify([]));
    }

    console.log(router.url)

    // if(router.url == '/cart')
    // {
    //   console.log("jaeysh")
    // }

  }

  ngOnInit(): void {
  }

  //count product
  countproductcart=() =>{
    let cart:any = localStorage.getItem('cart');
    return JSON.parse(cart).length;
  }

  //Load product navbar
  loadproductnavbar=()=>{
    this.cartlistnavbar_totalprice=0;
    let cart:any = localStorage.getItem('cart');
    this.cartlistnavbar=JSON.parse(cart);
    if(this.cartlistnavbar.length ==0)
    {
      this.cartlistnavbar_totalprice = 0;
    }else{
      this.cartlistnavbar.filter((item:any) => {
        this.cartlistnavbar_totalprice = this.cartlistnavbar_totalprice  + (item.price * item.buyquantity);   
    });
    }

    console.log(this.cartlistnavbar_totalprice)
    
  }

  //delete product navbar
  deleteproductcart=(i:any)=>{

    let cart:any = localStorage.getItem('cart');
    let productarr:any = JSON.parse(cart);
    productarr.splice(i,1);
  
    localStorage.setItem('cart',JSON.stringify(productarr));
    this.toastr.success("Product Removed");
    this.loadproductnavbar();

  }

  

  

}





