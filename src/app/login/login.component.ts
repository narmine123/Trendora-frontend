
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule,HttpClientModule, RouterModule], // Importez CommonModule pour ngClass

})
export class LoginComponent {
  loginObj = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.loginObj).subscribe(
      (response) => {
        alert('Login successful');
        console.log('Login successful', response);
        localStorage.setItem('access_token', response.access_token); // Stocker le token
        const token = localStorage.getItem('access_token');
        //localStorage.removeItem('access_token');//// Supprimer l'access token
      },
      (error) => {
        console.error('Login failed: Nom d’utilisateur ou mot de passe incorrect.');
        alert("Login failed: Nom d’utilisateur ou mot de passe incorrect.")
      }
    );
  }





}


