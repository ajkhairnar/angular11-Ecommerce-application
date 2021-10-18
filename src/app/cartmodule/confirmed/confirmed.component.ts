import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements OnInit {

  constructor() { 
    this.cleardata()
  }

  ngOnInit(): void {

  }


  cleardata()
  {
    localStorage.setItem("applcouponcode", JSON.stringify([]));
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("payid", JSON.stringify([]));
  }

}
