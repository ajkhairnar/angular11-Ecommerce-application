import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExternalLibraryService } from "../util";
import { Router} from '@angular/router';
declare let Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  response:any;
  razorpayResponse:any;
  showModal = false;
  orderprice:any=0;
  totalitem:any=0;
  couponcodeprice:any=0;
  totalamt:any=0;

  constructor(private razorpayService: ExternalLibraryService,
    private cd: ChangeDetectorRef,private router:Router, private zone: NgZone,) {
      this.ordersummery();
     }

  ngOnInit(): void {

    this.razorpayService
      .lazyLoadLibrary("https://checkout.razorpay.com/v1/checkout.js")
      .subscribe();

  }

 
  userdetails = new FormGroup({
    firstname : new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
    lastname  : new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
    email     : new FormControl('',[Validators.required,Validators.email]),
    street    :new FormControl('',Validators.required),
    city      :new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
    state     :new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
    country   :new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
    mobile    : new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),


  });

  get firstname()  { return this.userdetails.get('firstname')}
  get lastname()  { return this.userdetails.get('lastname')}
  get email()  { return this.userdetails.get('email')}
  get street()  { return this.userdetails.get('street')}
  get city() { return this.userdetails.get('city')}

  get state()  { return this.userdetails.get('state')}
  get country() { return this.userdetails.get('country')}
  get mobile() { return this.userdetails.get('mobile')}


  //get cartdetails 
  getcartdetails = () =>{
    let data:any = localStorage.getItem('cart');
    return JSON.parse(data);
  }

  //get coupon code
  getcouponcode = () =>{
    let checkcoupon:any = localStorage.getItem('applcouponcode');
    return JSON.parse(checkcoupon);
  }

  ordersummery = () =>{

    let data:any = this.getcartdetails();
    
    data.forEach( (item:any) =>{
      if(item.buycheck  == true)
      {
        this.orderprice = this.orderprice + (item.buyquantity * item.price);
        this.totalitem = this.totalitem + 1;
      }
    });

    this.totalamt = this.orderprice;

    let fetchcoupon:any = this.getcouponcode();
    if(fetchcoupon.length > 0)
    {
      this.couponcodeprice=fetchcoupon[0].price;
      this.totalamt = this.totalamt - this.couponcodeprice;
    }



  }






  // Note : Enter own razorpay key

  RAZORPAY_OPTIONS = {
    key: "rzp_test_1AvXoDXWyTuQmw",
    amount: "",
    name: "Shoppy",
    order_id: "",
    description: "Load Wallet",
    image:
      "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    prefill: {
      name: "",
      email: "",
      contact: "",
      method: ""
    },
    modal: {},
    theme: {
      color: "#9055A2"
    },
    handler:{}
  };

  public proceed(mobile:any,email:any,orderid:any,fullname:any) {

    this.RAZORPAY_OPTIONS.amount = this.totalamt + "00";
    // this.RAZORPAY_OPTIONS.order_id = orderid;
    this.RAZORPAY_OPTIONS.prefill.contact=mobile;
    this.RAZORPAY_OPTIONS.prefill.name=fullname;
    this.RAZORPAY_OPTIONS.prefill.email=email;
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS["handler"] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }

  public razorPaySuccessHandler(response:any) {

    if(response)
    {
      let responceid = response.razorpay_payment_id;
      localStorage.setItem('payid',JSON.stringify([responceid]));

      this.zone.run(() => this.router.navigate(['cart/confirm']));
      

    }else{

    }
    
  }

  userdetails_fill = () =>{

    let mobile = this.mobile?.value;
    let email = this.email?.value;
    let orderid ="Order_"+Math.floor(1000 + Math.random() * 9000);
    let fullname = this.firstname +" "+this.lastname;
    this.proceed(mobile,email,orderid,fullname)
  }


}
