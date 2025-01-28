import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne

})
export class HomeComponent {


 
  onsubmit():void{
    
        alert("The email  has been sent.");
        console.log("The email  has been sent.");
      }
    
  }
 

