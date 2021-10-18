import { Injectable } from '@angular/core';
// import * as data from '../products.json';
@Injectable({
  providedIn: 'root'
})
export class ProdserviceService {

  constructor() { }

  watch:any = {
    
    'category':['shirts','tshirts','jackets','kurtas','blazers'],
    'brand':['roadster','puma','parx'],
    'color':['pink','blue','white','black','red'],
    'price':['lowtohigh','hightolow'],
    'oldnew':['newest','oldest'],
    'products':[
      {
        'id':0,
        'title':'Dennis Lingo',
        'img':'8002a744-0dad-4dbb-9481-cf0090134c3b1566454086786-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-9891566454-1.jpg',
        'price':628,
        'mrp':1849,
        'discount':66,
        'size':[38,40,42,44,46],
        'metadata':['100% Original Products','Free Delivery on order above Rs. 799','Pay on delivery might be available','Easy 30 days returns and exchanges'],
        'detail':'Pink solid casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket',
        'shortline':'Men Slim Fit Casual Shirt',
        'review':3,
        'total' :2,
        'category':'shirts',
        'color':'pink',
        'brand':'puma',
        'sale':0
      },
      {
        'id':1,
        'title':'High Lander',
        'img':'b93f84ed-41cd-4f2b-bb52-f2b67f8c6c2d1615874312574-Roadster-Men-Blue--Black-Regular-Fit-Checked-Casual-Shirt-74-1.jpg',
        'price':579,
        'mrp':999,
        'discount':42,
        'size':[39,40,42,44],
        'metadata':['100% Original Products'],
        'detail':'Olive green casual shirt, has a mandarin collar, a full button placket, long sleeves, a patch pocket, and a curved hem',
        'shortline':'Men Regular Check Casual Shirt',
        'review': 2,
        'total' : 3,
        'category':'shirts',
        'color':'pink',
        'brand':'parx',
        'sale':0
      },
      {
        'id':2,
        'title':'Hancock',
        'img':'217dd595-4cc8-47da-9c5f-bb4f47747f461613734691792-Hancock-Men-Shirts-4361613734691103-1.jpg',
        'price':1379,
        'mrp':2299,
        'discount':40,
        'size':[36,40,42],
        'metadata':['100% Original Products','Pay on delivery might be available'],
        'detail':'Men Black Relaxed Regular Fit Solid Casual Shirt',
        'shortline':'Solid Linen Shirt',
        'review': 4,
        'total' : 4,
        'category':'shirts',
        'color':'black',
        'brand':'roadster',
        'sale':1
      },
      {
        'id':3,
        'title':'HERE&NOW',
        'img':'11525433792736-HERENOW-Men-Black-Printed-Round-Neck-T-shirt-2881525433792598-2.jpg',
        'price':524,
        'mrp':749,
        'discount':30,
        'size':['s','m','l','xl'],
        'metadata':['100% Original Products','Pay on delivery might be available'],
        'detail':'Men Black Relaxed Regular Fit Solid Casual Shirt',
        'shortline':'Men Printed Round Neck T-shirt',
        'review': 4,
        'total' : 4,
        'category':'tshirts',
        'color':'black',
        'brand':'roadster',
        'sale':0
      },
      {
        'id':4,
        'title':'Rigo',
        'img':'1c13b5f2-37db-4632-b206-99b40bbb8bf51537864626551-Rigo-Blue-With-Navy-Back-Yoke-Cuff-And-Bottom-Tshirt-Full-5651537864626357-1.jpg',
        'price':399,
        'mrp':999,
        'discount':60,
        'size':['s','m','l','xl'],
        'metadata':['100% Original Products','Pay on delivery might be available'],
        'detail':'Blue solid T-shirt, has a round neck, long sleeves',
        'shortline':'Round Neck T-shirt',
        'review': 5,
        'total' : 4,
        'category':'tshirts',
        'color':'blue',
        'brand':'parx',
        'sale':0
      },
      {
        'id':5,
        'title':'ADIDAS',
        'img':'df95a971-4a73-4cd7-83b5-732071a2f5eb1604384584872-ADIDAS-Men-Tshirts-9311604384582862-1.jpg',
        'price':3499,
        'mrp':4999,
        'discount':30,
        'size':['s','m','l','xl','xxl'],
        'metadata':['100% Original Products','Pay on delivery might be available'],
        'detail':'Men Red Printed Manchester United 20/21 Home Jersey T-Shirt',
        'shortline':'Men Manchester United T-Shirt',
        'review': 2,
        'total' : 2,
        'category':'tshirts',
        'color':'red',
        'brand':'puma',
        'sale':0
      },
      {
        'id':6,
        'title':'Mast & Harbour',
        'img':'11524631266122-Mast--Harbour-Men-White-Printed-Polo-T-shirt-1411524631265867-1.jpg',
        'price':3499,
        'mrp':4999,
        'discount':30,
        'size':['s','m','l','xl','xxl'],
        'metadata':['100% Original Products','Pay on delivery might be available'],
        'detail':'Men Red Printed Manchester United 20/21 Home Jersey T-Shirt',
        'shortline':'Printed Polo T-shirt',
        'review': 2,
        'total' : 2,
        'category':'tshirts',
        'color':'white',
        'brand':'puma',
        'sale':0
      },
      {
        'id':7,
        'title':'Nautica',
        'img':'a023025a-4a2d-43de-bae9-1376887ed85a1614597165102-Nautica-Men-Red-Solid-Lightweight-Puffer-Jacket-216161459716-1.jpg',
        'price':6499,
        'mrp':9999,
        'discount':35,
        'size':['s','m','l','xl','xxl'],
        'metadata':['100% Original Products','Pay on delivery might be available'],
        'detail':'Men Red Solid Lightweight Puffer Jacket',
        'shortline':'Solid Puffer Jacket',
        'review': 2,
        'total' : 2,
        'category':'jackets',
        'color':'red',
        'brand':'parx',
        'sale':0
      },
      {
        'id':8,
        'title':'Kook N Keech',
        'img':'11520055459949-Kook-N-Keech-Men-Jackets-361520055459784-2.jpg',
        'price':1319,
        'mrp':3299,
        'discount':60,
        'size':['s','m','l','xl','xxl'],
        'metadata':['100% Original Products','Pay on delivery might be available'],
        'detail':'Men Blue Denim Jacket with Applique Detail',
        'shortline':'Solid Denim Jacket',
        'review': 4,
        'total' : 1,
        'category':'jackets',
        'color':'blue',
        'brand':'roadster',
        'sale':0
      },
      {
        'id':9,
        'title':'See Designs',
        'img':'3e816f15-5fe5-4cdc-b239-4f4ee8673e811537337776056-India-3011537337775771-1.jpg',
        'price':899,
        'mrp':2499,
        'discount':64,
        'size':['s','m','l','xl','xxl'],
        'metadata':['100% Original Products','Pay on delivery might be available','Free Delivery on order above Rs. 799'],
        'detail':'Men Blue Solid Asymmetric Straight Kurta',
        'shortline':'Asymmetric Straight Kurta',
        'review': 3,
        'total' : 3,
        'category':'kurtas',
        'color':'blue',
        'brand':'puma',
        'sale':0

      }, 
    ]
  }

  couponcode:any = [
    {
      code:'Codeold',
      price:100,
    },
    {
      code:'Codenew',
      price:110,
    }
  ]

  getallproduct=()=>{
    return this.watch;
  }

  
  getssingleproduct=()=>{
    return this.watch.products;
  }

  getsingleproduct=(id:Number)=>{
   
    let p:any[] = this.watch.products;
    let r:any;
    const j = p.filter(i =>{
        if(i.id === Number(id))
        {
          r = i;
        }
    });

    return r;
  }



  //start Localstorage-------------

  count_cart_service=()=>{

    let cart:any = localStorage.getItem('cart');
    return JSON.parse(cart).length;
    
  }

  addtocart_service=(product:any)=>{

    let cart:any = localStorage.getItem('cart');
    let productarr:any = JSON.parse(cart);

    productarr.push(product)
  
    let isupdate:any = localStorage.setItem('cart',JSON.stringify(productarr));
   

  }

  

}
