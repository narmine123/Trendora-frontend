import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.ShadowDom, 
})
export class HomeComponent {
  ngOnInit(): void {
    // Dynamically remove a global script
    const script = document.querySelector(
      'script[src="/assets/js/*.js"]'
    );
    if (script) {
      script.parentNode?.removeChild(script);
    }
    this.loadScript();
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = './home.component.script.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
