import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HomeComponent],
  template: `
    <main>
      <header class="brand-name">
        <img src="assets/dotSTORE.png" alt="Logo" class="logo">
        <h1>UTN Trabajo Final Angular</h1>
        <button class="button-home" routerLink="/"> Home </button>
      </header>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
