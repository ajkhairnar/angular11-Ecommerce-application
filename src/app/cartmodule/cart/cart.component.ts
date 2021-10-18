import { Component, OnInit } from '@angular/core';
import { ProdserviceService} from '../../_services/prodservice.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productlist:any = [];
  selecteditem:any=0;
  couponcodelist:any=[];

  couponcode:any='';
  coupon_error:any;

  total_amount:any;
  appliedcouponprice:any=0;

  loadershow:boolean=false;
  

  styleerror={}
  //order sammury

  s_price:any;
  constructor( private producservice:ProdserviceService,
                private toastr:ToastrService,
                private activaterouter:ActivatedRoute 
              ) { 
    
    this.loaddata();

    activaterouter.fragment.subscribe(res =>{
      this.Jumpto(res);
    })

    this.websiteloader_500();
    

  }

  ngOnInit(): void {
    
  }


  getcartlist = () =>{
    let data:any = localStorage.getItem('cart');
    return JSON.parse(data);
  }


  //load product
  loaddata = () =>{
    this.selecteditem=0;
    this.productlist=this.getcartlist();

    this.productlist.filter((item:any) =>{
      if(item.buycheck == true)
      {
        this.selecteditem = this.selecteditem + 1;
      }
    });


    //removecounpon only last item selected or last item delete then remove coupon code
    if(this.selecteditem == 0 || this.productlist.length == 0)
    {
      this.removecoupon()
    }

    this.ordersummary()
    this.showcouponlist();

    //clear style couponcode
    this.emptycouponcodestyle();

  }

  //delete product
  deleteproduct = (i:any) =>{
    this.productlist =this.getcartlist();
    this.productlist.splice(i,1);
    localStorage.setItem('cart',JSON.stringify(this.productlist))
    this.toastr.success("Product Removed");
    this.loaddata();

    this.websiteloader()
  }


  //product select or deselect
  select_deselect_item=(i:any,buycheck:any)=>{
    
    this.productlist =this.getcartlist();
    this.productlist[i].buycheck = !buycheck;
    localStorage.setItem('cart',JSON.stringify(this.productlist))
    // this.removecoupon();

    this.loaddata();

    this.websiteloader()
    

  }



  //product increse or descrese
  btnproductinr_der = (buyquantity:any,total:any,i:any,inc_der:any) =>{
    
    let update_buyquantity:any;
    let flag:any = 1;
    if(inc_der == 'increse')
    {
      update_buyquantity = buyquantity + 1;
     
    }else if(inc_der == 'decrese'){
      update_buyquantity = buyquantity - 1;

    }else{
      flag = 0;
    }
    
   
    if(total >= update_buyquantity && flag == 1)
    {
     
      this.productlist =this.getcartlist();
      this.productlist[i].buyquantity = update_buyquantity;
      this.productlist[i].buycheck= true;
      localStorage.setItem('cart',JSON.stringify(this.productlist));
      this.toastr.success("Cart updated");
      this.loaddata();

    }else{
      this.toastr.error("Something wents Wrong");
    }

    this.websiteloader()
    
  }



  //Order Summery
  ordersummary = () =>{

    let data:any=this.getcartlist();

    let s:any=0;
  
    data.filter((item:any) =>{
      if(item.buycheck === true)
      {
       
        s = s + (item.buyquantity * item.price);
      }
    });

    this.s_price = s;
    this.total_amount =s;

    let checkcoupon:any = localStorage.getItem('applcouponcode');
    checkcoupon=JSON.parse(checkcoupon);

    this.appliedcouponprice=0;
  
    if(checkcoupon.length > 0)
    {
      this.appliedcouponprice=checkcoupon[0].price;
      this.total_amount = this.total_amount - checkcoupon[0].price;
    }


  }



  Jumpto = (section:any) =>{
    document.getElementById(section)?.scrollIntoView({behavior:"smooth"})
  }

  //show coupon list 
  showcouponlist()
  {
    this.couponcodelist=this.producservice.couponcode;

   
  }


  // click on apply btn then apply coupon
  applycouponnew = () =>{

    let lists:any = this.producservice.couponcode;
    let matchcode:any;
    let success_applycoupon:any;
    if(this.couponcode != "")   
    {
      lists.filter((item:any) =>{
        if(item.code == this.couponcode)
        {
          matchcode = 1
          success_applycoupon={'code':item.code,'price':item.price}

        }
      });


      //code match then if execute either else
      if(matchcode == 1)
      {
        let data:any = localStorage.getItem('applcouponcode');
        data=JSON.parse(data);
        data.length =0;
        data.push(success_applycoupon);
        localStorage.setItem('applcouponcode',JSON.stringify(data))
        this.styleerror ='#00b74a';
        this.coupon_error="Coupon Code Applied Successfully.";

        this.ordersummary()
        this.websiteloader_500()

        
      }else{

        this.styleerror ='#f93154'
        
        this.coupon_error="Please Enter Valid Coupon Code.";

        this.websiteloader_500();

      }

    }else{
      this.styleerror = '#f93154';
    
      this.coupon_error="Please Enter Coupon Code.";
    } 
  }


  //remove coupon
  removecoupon=(remove:any='') =>{
    let data:any = localStorage.getItem('applcouponcode');
        data=JSON.parse(data);
        data.length =0;
        localStorage.setItem('applcouponcode',JSON.stringify(data));

        if(remove != '')
        {
          this.toastr.success('Removed Coupon Code');
        }
        
        this.websiteloader_500()
        //clear style couponcode
        this.emptycouponcodestyle();

        this.ordersummary()
  }


  emptycouponcodestyle=() =>{
    this.couponcode='';
    this.coupon_error='';
    this.styleerror='';
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
