import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
   constructor(private authService: AuthService, private router: Router) {}
   client = {
    numerotelephone: null,
    nationality:'',
    age: null ,
    birthdate:null,
    ville:'',
    adresselivraison:''
  }
 
      
  onSubmit(): void {
    this.authService.save(this.client).subscribe(
      (response) => {
        console.log('Client information saved successfully:', response); // Clear and professional log message
        alert('Your information has been saved successfully. Thank you for your trust!'); // Polite and professional user message
      },
      (error) => {
        console.error('An error occurred while saving client information:', error); // Detailed and professional error log
        alert('An error occurred while saving your information. Please try again.'); // Clear and helpful user message
      }
    );
  }

  onseen() {
    this.router.navigate(['/user/:id']);
  }

}
