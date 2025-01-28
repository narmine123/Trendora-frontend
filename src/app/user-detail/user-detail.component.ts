// user-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
  };
  profile: any = {
    numerotelephone: null,
    nationality: '',
    birthdate: null,
    age: null,
    ville: '',
    adresselivraison: '',
  };

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userIdParam = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('User ID param:', userIdParam);

    if (!userIdParam) {
      console.error('User ID param is null or undefined');
      return;
    }

    const userId = Number(userIdParam);
    console.log('User ID (parsed):', userId);

    if (isNaN(userId) || userId <= 0) {
      console.error('Invalid user ID');
      return;
    }

    this.loadUserDetails(userId);
  }

  loadUserDetails(userId: number): void {
    console.log('Fetching user details and profile for User ID:', userId);

    this.authService.getUserWithProfile(userId).subscribe(
      (response) => {
        console.log('User details and profile fetched:', response);
        this.user = response.user;  // Les données de l'utilisateur
        this.profile = response.profile; // Les données du profil
      },
      (error) => {
        console.error('Failed to fetch user details and profile:', error);
      }
    );
  }
  
}
