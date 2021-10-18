import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { RemovesspacePipe } from './_pipes/removesspace.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AngularFireModule } from '@angular/fire';  
import { AngularFireDatabaseModule } from '@angular/fire/database';  
import { AngularFirestoreModule } from '@angular/fire/firestore';  
import { environment } from 'src/environments/environment';
import {HttpClientModule } from '@angular/common/http';
import { FileComponent } from './file/file.component';
@NgModule({

  declarations: [     
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    ProductdetailsComponent,
    RemovesspacePipe,
    WishlistComponent,
    FileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),  
    AngularFireDatabaseModule,  
    AngularFirestoreModule,
    HttpClientModule  
  ],
  providers: [AngularFireModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
