import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);
  // Asegúrate de que esta URL coincida con tu backend
  private apiUrl = 'http://localhost:3000/reports/generate-certificate';

  downloadCertificate(data: any) {
    // IMPORTANTE: responseType: 'blob' le dice a Angular que viene un archivo
    return this.http.post(this.apiUrl, data, { responseType: 'blob' });
  }
}