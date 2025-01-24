import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './Carts/cart/cart.component';
import { HomeComponent } from './home/home.component';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    FormsModule,
    HomeComponent,
    HttpClientModule,
    RouterOutlet,

    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne
})
export class AppComponent {
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  title = 'Trendora_frontend';

  constructor(private router: Router, private authService: AuthService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToCatalogue() {
    this.router.navigate(['/catalogue']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  logout() {
    this.authService.logout();
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  goToUser() {
    this.router.navigate(['user/:id']);
  }
  goToCart() {
    this.router.navigate(['cart']);
  }
}
