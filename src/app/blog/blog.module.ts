import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogpageComponent } from './blogpage/blogpage.component';

console.log("jaeysh")
@NgModule({
  declarations: [BlogpageComponent],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
