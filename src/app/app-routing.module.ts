import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CartComponent } from './Carts/cart/cart.component';
import { HomeComponent } from './home/home.component';

import { OrderComponent } from './order/order.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'cart', component: CartComponent },
    {path:'order', component: OrderComponent}


  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
