import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DevExtremeModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { CatalogueComponent } from './Products/catalogue/catalogue.component';
import { LoginGuard } from './guard/login.guard';
import {
  LoginInterceptor,
  LoginInterceptorProvider,
} from './interceptors/login.intercepter';
import { ResetComponent } from './reset/reset.component';
import {  Routes } from '@angular/router';
import { CartComponent } from './Carts/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule,
    DxPopupModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DevExtremeModule,
    DxNumberBoxModule,
    DxFormModule,
    DxButtonModule,
    DxDataGridModule,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    CatalogueComponent,
    CartComponent,
    BrowserModule,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
     FormsModule,
     CommonModule,
     RouterModule ,
    ReactiveFormsModule,
  ],
  providers: [
    LoginGuard,
    LoginInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true,
    },
  ],
  bootstrap: [],
  exports: [
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    CatalogueComponent,
  ],
})
export class AppModule {}
