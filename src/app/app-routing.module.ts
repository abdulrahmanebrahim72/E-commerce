import { CheckoutComponent } from './checkout/checkout.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MycartComponent } from './mycart/mycart.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AllordersComponent } from './allorders/allorders.component';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full",title:"LogIn"},
  {path:"home",canActivate:[authGuard],component:HomeComponent,title:"Home"},
  {path:"categories",canActivate:[authGuard],component:CategoriesComponent,title:"Categories"},
  {path:"categorydetails/:_id",canActivate:[authGuard],component:CategorydetailsComponent,title:"Categories"},
  {path:"brands",canActivate:[authGuard],component:BrandsComponent,title:"Brands"},
  {path:"details/:_id",canActivate:[authGuard],component:ProductDetailsComponent,title:"Product Details"},
  {path:"products",canActivate:[authGuard],component:ProductsComponent,title:"Products"},
  {path:"wishlist",canActivate:[authGuard],component:WishlistComponent,title:"Wishlist"},
  {path:"cart",canActivate:[authGuard],component:MycartComponent,title:"Cart"},
  {path:"profile",canActivate:[authGuard],component:ProfileComponent,title:"Profile"},
  {path:"changePass",canActivate:[authGuard],component:ChangepasswordComponent,title:"Change Password"},
  {path:"changeData",canActivate:[authGuard],component:ChangeUserDataComponent,title:"Change User Data"},
  {path:"register",component:RegisterComponent,title:"Register"},
  {path:"login",component:LoginComponent,title:"LogIn"},
  {path:"logout",component:LoginComponent,title:"LogIn"},
  {path:"forgotPass",component:ForgotPasswordComponent,title:"Forgot Password"},
  {path:"resetPass",component:ResetPasswordComponent,title:"Reset Password"},
  {path:"onlinePayment",component:CheckoutComponent,title:"Online Payment"},
  {path:"allorders",component:AllordersComponent,title:"All Orders"},
  {path:"**",component:NotfoundComponent,title:"Not Found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
