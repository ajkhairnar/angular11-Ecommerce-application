import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistarr:any=[];
  constructor(private toastr:ToastrService) {

    this.getwishlist()

   }

  ngOnInit(): void {
  }


  getwishlist = () =>{
    let wishlist:any = localStorage.getItem('wishlist');
    this.wishlistarr = JSON.parse(wishlist);
  }

  removewishlist = (i:any) =>{
    let wishlist:any = localStorage.getItem('wishlist');
    this.wishlistarr.splice(i,1);
    localStorage.setItem('wishlist',JSON.stringify(this.wishlistarr));
    this.toastr.success('Removed to wishlist');
    this.getwishlist();

  }


}
