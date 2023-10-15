import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MycartComponent } from './mycart/mycart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule , Routes } from '@angular/router';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { SearchPipe } from './search.pipe';
import { AddheadersInterceptor } from './interceptors/addheaders.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    BrandsComponent,
    ProductsComponent,
    RegisterComponent,
    NavbarComponent,
    NotfoundComponent,
    MycartComponent,
    WishlistComponent,
    ProfileComponent,
    LoginComponent,
    ProductDetailsComponent,
    MainSliderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CheckoutComponent,
    AllordersComponent,
    SearchPipe,
    LoaderComponent,
    FooterComponent,
    CategorydetailsComponent,
    ChangepasswordComponent,
    ChangeUserDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AddheadersInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoaderInterceptor,
      multi:true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
