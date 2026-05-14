// src/app/components/export-button/export-button.component.ts
import { Component, inject, signal, Input, input } from '@angular/core';
import { ReportService } from '../../../services/report.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-export-button',
  standalone: true,
  templateUrl: './export-button.component.html', 
  styleUrl: './export-button.component.css',
  imports: [CommonModule]
})
export class ExportButtonComponent {
  private reportService = inject(ReportService);
  cargando = signal(false); // Usamos un signal para controlar si está cargando

@Input({required: true}) dataToExport : any;
@Input() disabled: boolean = false; 

  descargar() {
    this.cargando.set(true);

    this.reportService.downloadCertificate(this.dataToExport).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const tipoLimpio = this.dataToExport.tipo ? this.dataToExport.tipo.replace(/\s+/g, '_') : 'general';
        const placaStr = this.dataToExport.placa || 'SinPlaca';

        a.download = `Certificado_${tipoLimpio}_${placaStr}.pdf`;

        a.click();
        window.URL.revokeObjectURL(url);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al descargar', err)
        this.cargando.set(false);
      }
    });
  }
}