import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ExportButtonComponent } from './components/export-button/export-button.component';

@Component({
  selector: 'app-root',
  imports: [ExportButtonComponent, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal ('frontend');
  
  vehiculoSeleccionado = {
    conductorNombre: '',
    placa: '',
    tipo: '',
    empresa: '',
    fecha: new Date().toLocaleDateString()
  };
}
