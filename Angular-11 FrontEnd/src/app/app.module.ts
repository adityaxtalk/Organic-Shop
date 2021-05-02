import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';

import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap"
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { CustomFormsModule } from 'ng2-validation';
import { ProductService } from './services/product.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { DataTableModule } from 'angular7-data-table';
import { DataTablesModule } from 'angular-datatables';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { AuthGuard } from './services/auth-guard.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { OrderService } from './services/order.service';
import { AdminGuardService } from './services/admin-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    RegisterComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CustomFormsModule,
    NgbModule,
    DataTableModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:ProductsComponent,pathMatch:'full'},
      
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard]},
     
      {path:'login',component:LoginComponent},
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuard]},
      {path:'admin/products/new',component:ProductFormComponent,canActivate:[AuthGuard,AdminGuardService]},
      {path:'admin/products/:id',component:ProductFormComponent,canActivate:[AuthGuard,AdminGuardService]},
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuard,AdminGuardService]},
      {path:'register',component:RegisterComponent},
      {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuard]}
      
    ])
  ],
  providers: [
    UserService,
    CategoryService,
    ProductService,
    OrderService,
    ShoppingCartService,
    AdminGuardService,
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
