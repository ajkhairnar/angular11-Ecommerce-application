import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProdserviceService } from '../_services/prodservice.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
let $:any;
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  product:any;


  // btnshows



  //------viewproduct variable (vp - view product)----------
  vpid:any;
  vptitle:any;
  vpimg:any;
  vpprice:any;
  vpmrp:any;
  vpdiscount:any;
  vpdetail:any;
  vpsale:any;
  vpsize:any=[];
  vpreview:any;
  
  vptotal:any;
  btninc:boolean=true;
  btnder:boolean=true;

// ----------------------------------

error_size:boolean=false;
sizeerr:any="0px";
size:Number=0;

// btn show

showaddcartbtn:boolean=true;
showgocartbtn:boolean=false;


loadershow:boolean=false;

  constructor( private produservice:ProdserviceService,
               private activateroute:ActivatedRoute,
               private renderer: Renderer2,
               private toastr:ToastrService) { 

    let id:any = activateroute.snapshot.paramMap.get('id');
  
    this.product = this.produservice.getsingleproduct(id);
   
    this.vpid = this.product.id;
    this.vptitle = this.product.title;
    this.vpimg = this.product.img;
    this.vpprice = this.product.price;
    this.vpmrp = this.product.mrp;
    this.vpdiscount = this.product.discount;
    this.vpdetail = this.product.detail;
    this.vpsale = this.product.sale;
    this.vpsize = this.product.size;
    this.vptotal = this.product.total;
    this.vpreview = this.product.review;

    this.websiteloader();
   

  }

  ngOnInit(): void {
    this.addJsToElement('../../assets/js/front.js');
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }


  sentsize=(s:any)=>{

    this.size=s.target.value;
    this.sizeerr="0px";
    this.error_size=false;
    this.showaddcartbtn=true;
    this.showgocartbtn=false;
  }


  addtocart=(pid:any)=>{
    this.websiteloader_500();
    let flag:any =0;
    if(this.size==0 )
    {
      this.sizeerr="22px";
      this.error_size=true;

    }else{

      //get cart product list
      let cart:any = localStorage.getItem('cart');
      let productarr:any = JSON.parse(cart);
      let emptyarr:any = [];
      if(productarr.length == 0)
      {
        this.sizeerr="0px";
        this.error_size=false;
        this.product.buyquantity = 1;
        this.product.buysize = this.size;
        this.product.buycheck = true;
        this.produservice.addtocart_service(this.product)
        this.toastr.success("Added to Cart");
        this.showaddcartbtn=false;
        this.showgocartbtn=true;

      }else{

        productarr.forEach((item:any,i:any)=>{
         
          if(item.id == pid && item.buysize == this.size)     //match property
          {
            flag = 1;
            emptyarr.push(item);
            emptyarr.push(i)

          }      

                 
        });


        // modify array
        if(flag == 1 && emptyarr.length !=0)
        {
          emptyarr[0].buyquantity = emptyarr[0].buyquantity + 1;
          productarr[ emptyarr[1] ] = emptyarr[0];
          localStorage.setItem('cart',JSON.stringify(productarr));
          
          this.toastr.success("Added to Cart");
            
         
          this.showaddcartbtn=false;
          this.showgocartbtn=true;
        }else{

          this.sizeerr="0px";
          this.error_size=false;
          this.product.buyquantity = 1;
          this.product.buysize = this.size;
          this.product.buycheck = true;
          this.produservice.addtocart_service(this.product);
          this.toastr.success("Added to Cart");
          this.showaddcartbtn=false;
          this.showgocartbtn=true;
        }



      }

      
      // else{

      //   this.produservice.addtocart_service(this.product);
      //   this.showaddcartbtn=false;
      //   this.showgocartbtn=true;

      // }

    }
  }



  addtowishlist = (vpid:any) =>{

    if(this.size==0 )
    {
      this.sizeerr="22px";
      this.error_size=true;

    }else{

      let wishlist:any = localStorage.getItem('wishlist');
      let wishlistarr:any = JSON.parse(wishlist);

      let productnewish:any = this.produservice.getsingleproduct(vpid);

      if(wishlistarr.length == 0)
      {
        productnewish.wishlist_size = this.size;
        localStorage.setItem('wishlist',JSON.stringify([productnewish]));
        this.toastr.success("Added to Wishlist");

      }else{

        let flag = 0;

        wishlistarr.forEach((item:any) =>{
          if(item.id == vpid && item.wishlist_size == this.size){
             flag = 1;
          }
        });

        if(flag == 0)
        {
          productnewish.wishlist_size = this.size;
          wishlistarr.push(productnewish)
          localStorage.setItem('wishlist',JSON.stringify(wishlistarr));
          this.toastr.success("Added to Wishlist");
        }else{
          this.toastr.success("Already to Wishlist");
        }

      }
     
    }

  }




  websiteloader = () =>{
    this.loadershow = true;
    setTimeout(()=>{
      this.loadershow =false;
    },1000)
  }

  websiteloader_500 = () =>{
    this.loadershow = true;
    setTimeout(()=>{
      this.loadershow =false;
    },500)
  }


}
