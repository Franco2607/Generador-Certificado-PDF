import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportButtonComponent } from '../../atoms/export-button/export-button.component';
import { LabeledInputComponent } from '../../molecules/labeled-input/labeled-input';
import { LabeledSelectComponent } from '../../molecules/labeled-select/labeled-select';

@Component({
  selector: 'app-certificate-form', 
  standalone: true,
  imports: [CommonModule, FormsModule, ExportButtonComponent, LabeledInputComponent, LabeledSelectComponent],
  templateUrl: './certificate-form.html',
  styleUrl: './certificate-form.scss'
})
export class CertificateFormComponent {
  vehiculoSeleccionado = {
    conductorNombre: '',
    placa: '',
    tipo: '',
    empresa: '',
    fecha: new Date().toLocaleDateString()
  };
}
    