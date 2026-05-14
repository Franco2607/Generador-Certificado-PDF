import { Component, signal } from '@angular/core';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal ('frontend');
}
