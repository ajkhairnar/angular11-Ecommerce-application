import { Component, OnInit } from '@angular/core';
import { ProdserviceService } from '../_services/prodservice.service';
import {Router,ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
 
  

  category:any;
  brand:any;
  color:any;
  price:any;
  mainproduct:any;
  products:any;

  filterproducts:any=[];

  //------viewproduct variable (vp - view product)----------
    vptitle:any;
    vpimg:any;
    vpprice:any;
    vpmrp:any;
    vpdiscount:any;
    vpdetail:any;
    vpsize:any=[];
    vpcounter:any=[];
    vptotal:any;

    btninc:boolean=true;
    btnder:boolean=true;
  // ----------------------------------

  // queryparams filter -----------
  filter:any={};

  fcategory:any=[];
  fbrand:any=[];
  fcolor:any=[];
  fsortprice:any=[];
  fsortoldnew:any=[];


categoryselected:any=[];
 
ip:any;
  
 //pagination
 config:any;
  

 loadershow:boolean=false;

  constructor(private produservice:ProdserviceService,
              private router:Router,
              private activateroute:ActivatedRoute,
              private angularFirestore: AngularFirestore,
              private http:HttpClient) { 
            
  
    //pagination
    this.config = { itemsPerPage: 6, currentPage: 1,}

    this.mainproduct = this.produservice.getallproduct();

    this.products=this.mainproduct.products;
    
    

    activateroute.queryParams.subscribe(
      res =>{
        this.websiteloader_500()
        // res return object
        let f = !Object.keys(res).length; //check response({}) empty or not
        
        this.config.currentPage=1;

        //response empty check 
        if(f)
        {
         
          this.products=this.produservice.getallproduct().products;

        }else{
        
        let product = this.mainproduct.products;
        this.categoryselected.length=0;

        for(let value in res) {

            let a = res[value].split(',');
            this.categoryselected.push(...a);

            if(value == 'category')
            {
              this.fcategory =[...new Set(a)];

            } else if(value == 'brand'){

              this.fbrand =[...new Set(a)];

            }else if(value == 'color')
            {
              this.fcolor =[...new Set(a)];
            } else if(value == 'price')
            {
              this.fsortprice =[...new Set(a)];
            }  
        }

        let filter1 = {
          category: this.fcategory,
          brand: this.fbrand,
          color:this.fcolor,
      };

      if(res.category || res.color || res.brand) {
        let query = this.buildFilter(filter1)
        this.products = this.filterData(product, query);
      }else{
      
        this.products =this.mainproduct.products;
      }

      

      //short using price
      if(res.price)
      {
        if(res.price == 'lowtohigh'){
         
          this.products.sort(function(a:any, b:any) {
            return a.price - b.price;
          });
        }else if(res.price == 'hightolow'){
         
          this.products.sort(function(a:any, b:any) {
            return b.price - a.price;
          });
        }
      }

     



      }

      

        
        
      }
    )

    
    
   

    //dynamic filteration
    this.getfilterationdata();

    this.getip()

  }

  ngOnInit(): void {
 
    // this.router.navigate(['shop'])

  }

  getfilterationdata= () =>{
    this.category = this.mainproduct.category;
    this.brand = this.mainproduct.brand;
    this.color = this.mainproduct.color;
    this.price = this.mainproduct.price;
  }



  category_filter=(keys:any,category:any)=>{
    
    let flag =0;
    let tem ='';
    // For category ---------------------
    if(keys == 'category'){
      if(this.fcategory.length == 0)
      {
        this.fcategory.push(category);

      }else{

        for(var i=0; i < this.fcategory.length; i++)
        {
          if(this.fcategory[i] == category)
          {
            this.fcategory.splice(i,1);
            flag=0;
            break;

          }else{
            flag=1;
            tem=category;
          }
        }

        if(flag === 1)
        {
          this.fcategory.push(tem);
        }
       
      }

     
    } 

    // For brand ---------------------
    if(keys == 'brand'){
      if(this.fbrand.length == 0)
      {
        this.fbrand.push(category);

      }else{

        for(var i=0; i < this.fbrand.length; i++)
        {
          if(this.fbrand[i] == category)
          {
            this.fbrand.splice(i,1);
            flag=0;
            break;

          }else{
            flag=1;
            tem=category;
          }
        }

        if(flag === 1)
        {
          this.fbrand.push(tem);
        }
       
      }

    
    } 

    //For Color----------- 

    if(keys == 'color'){
      if(this.fcolor.length == 0)
      {
        this.fcolor.push(category);

      }else{

        for(var i=0; i < this.fcolor.length; i++)
        {
          if(this.fcolor[i] == category)
          {
            this.fcolor.splice(i,1);
            flag=0;
            break;

          }else{
            flag=1;
            tem=category;
          }
        }

        if(flag === 1)
        {
          this.fcolor.push(tem);
        }
       
      }

  
    } 

    //For price----------
    if(keys == 'price'){

      let category1 = category.target.value;

      if(category1.length == ''){
        this.fsortprice.length = 0;
      }else{
        this.fsortprice.length = 0;
        this.fsortprice.push(category1);
      }

      

     
    } 
      
    // this.router.navigate(['shop'], { queryParams: this.fcategory });
    this.final_filter()  
  }


  final_filter= () =>{
    
    if(this.fcategory.length !=0 )
    {
      this.filter.category=this.fcategory.toString();

    }else{
      delete this.filter.category;
    }

    if(this.fbrand.length !=0 )
    {
      this.filter.brand=this.fbrand.toString();
    }else{
      delete this.filter.brand;
    }

    if(this.fcolor.length !=0 )
    {
      this.filter.color=this.fcolor.toString();
    }else{
      delete this.filter.color;
    }

    if(this.fsortprice.length !=0 )
    {
      
      this.filter.price=this.fsortprice.toString();
    }else{
      delete this.filter.price;
    }

    this.router.navigate(['shop'], { queryParams: this.filter });

  }

  categoryfound(c:any)
  {
    return this.categoryselected.includes(c);
  }

  viewproduct = (p:any) =>{
  
    this.vptitle=p.title;
    this.vpimg = p.img;
    this.vpprice=p.price;
    this.vpmrp=p.mrp;
    this.vpdiscount=p.discount;
    this.vpdetail=p.detail;
    this.vpsize=p.size;
    this.vptotal=p.total;
    this.vpcounter=1;
    
  }

  productcounter_increse=()=>{
    
    if(this.vptotal > this.vpcounter)
    {
      this.btnder=true;
      this.vpcounter = this.vpcounter + 1;
    }else{
      this.btninc=false;
    }
    

  }

  productcounter_descrese=()=>{
    if(this.vpcounter > 1)
    {
      this.vpcounter = this.vpcounter - 1;
      this.btninc=true;
    }else{
      this.btnder=false;
      this.btninc=true;
    }
  }



  f()
  {
    
      let n:any=[];
       
        for(var i=0; i < this.categoryselected.length;i++)
        {
            for(var j=0;j<this.products.length;j++)
            {
              
                if(this.products[j].category == this.categoryselected[i]){
                  n.push(this.products[j])
                }
             
            }
        }


       
      }
  




buildFilter = (filter:any) => {
  let query:any = {};
  for (let keys in filter) {
    
      if (filter[keys].constructor === Array && filter[keys].length > 0) {
          query[keys] = filter[keys];
      }
  }
  return query;
}


filterData = (data:any, query:any) => {
  const filteredData = data.filter( (item:any) => {
      for (let key in query) {
          if (item[key] === undefined || !query[key].includes(item[key])) {
              return false;
          }
      }
      return true;
  });
  return filteredData;
};




//---------- pagination ---------------

pageChange(event:any){
  this.config.currentPage = event;
}

count()
{
  return this.products.length
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

getip = () =>{
                  this.ip=Math.floor(1000 + Math.random() * 9000);
                this.angularFirestore.collection('ipaddress').snapshotChanges().subscribe(
                  data =>{
                    data.map(e => {  
                      return {  
                        id: e.payload.doc.id,  
                        data :e.payload.doc.data()
                      };  
                    });  
                    
                      this.angularFirestore.collection('ipaddress').doc(this.ip).set({
                        ip: this.ip,
                      });

                  }
                );


           
}

}
