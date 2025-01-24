import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './Products/catalogue/catalogue.component';
import { ResetComponent } from './reset/reset.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CartComponent } from './Carts/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalogue', component: CatalogueComponent },
  {
    path: 'register',
    component: RegisterComponent /*canActivate:[LoginGuard]*/,
  },
  { path: 'reset', component: ResetComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'cart', component: CartComponent },
  //{ path: 'home', component: HomeComponent }

  { path: 'register', component: RegisterComponent, /*canActivate:[LoginGuard]*/ },
  {path:'reset', component: ResetComponent},
  {path:'user/:id', component:UserDetailComponent},
  {path:'order', component: OrderComponent},

];


  /*  {
        path:'' ,
        redirectTo:'login' , pathMatch:'full'//cette redirection ne se produira que si l'URL est exactement vide et ne contient aucun autre segment de chemin.
    },

    {
        path:'login', component:LoginComponent
    },

    /*{
        path:'', component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component: DashboardComponent
            }
        ]
    }*/







