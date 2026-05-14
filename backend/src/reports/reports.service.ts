import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Readable } from 'stream';
import { CreateCertificateDto } from './dto/certificate.dto';

@Injectable()
export class ReportsService {
  
  private generarHtml(data: CreateCertificateDto): string {
    let titulo = '';
    let cuerpoTexto = '';

    switch (data.tipo) {
      case 'Afiliación propietario':
        titulo = 'CERTIFICADO DE AFILIACIÓN (PROPIETARIO)';
        cuerpoTexto = `
          <p>Por medio de la presente, la empresa <strong>${data.empresa}</strong></p>
          <p>Certifica que el vehículo con placas <span class="highlight">${data.placa}</span></p>
          <p>Se encuentra afiliado a nuestra empresa, y certificamos que el propietario registrado es <span class="highlight">${data.conductorNombre}</span>.</p>
        `;
        break;

      case 'Afiliación conductor':
        titulo = 'CERTIFICADO DE AFILIACIÓN (CONDUCTOR)';
        cuerpoTexto = `
          <p>Por medio de la presente, la empresa <strong>${data.empresa}</strong></p>
          <p>Certifica que el señor(a) <span class="highlight">${data.conductorNombre}</span></p>
          <p>Se encuentra activo y afiliado como conductor autorizado para el vehículo con placas <span class="highlight">${data.placa}</span>.</p>
        `;
        break;

      case 'Ingresos propietario':
        titulo = 'CERTIFICADO DE INGRESOS MENSUALES';
        cuerpoTexto = `
          <p>La empresa <strong>${data.empresa}</strong> hace constar que:</p>
          <p>El vehículo de placas <span class="highlight">${data.placa}</span>, a cargo de <span class="highlight">${data.conductorNombre}</span>,</p>
          <p>Ha generado ingresos mensuales según nuestros registros operativos. (Aquí puedes ajustar el texto según necesites).</p>
        `;
        break;

      case 'Laboral':
        titulo = 'CERTIFICADO LABORAL';
        cuerpoTexto = `
          <p>La empresa <strong>${data.empresa}</strong> certifica que:</p>
          <p>El señor(a) <span class="highlight">${data.conductorNombre}</span> se encuentra vinculado(a) laboralmente con nosotros.</p>
          <p>Relacionado con la operación del vehículo placas <span class="highlight">${data.placa}</span>.</p>
        `;
        break;

      case 'DIAN':
        titulo = 'CERTIFICADO PARA EFECTOS TRIBUTARIOS (DIAN)';
        cuerpoTexto = `
          <p><strong>${data.empresa}</strong> emite el presente certificado para fines tributarios.</p>
          <p>A nombre de <span class="highlight">${data.conductorNombre}</span> relacionado con el vehículo <span class="highlight">${data.placa}</span>.</p>
          <p>Certificamos los movimientos del año gravable vigente.</p>
        `;
        break;

      default:
        titulo = 'CERTIFICADO GENERAL';
        cuerpoTexto = `
          <p>Por medio de la presente, la empresa <strong>${data.empresa}</strong></p>
          <p>Emite este certificado general a nombre de <span class="highlight">${data.conductorNombre}</span></p>
          <p>Para el vehículo con placas <span class="highlight">${data.placa}</span>.</p>
        `;
        break;
    }

    return `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; border: 10px solid #eee; padding: 40px; }
            .header { text-align: center; color: #FF0000; text-transform: uppercase; }
            .content { margin-top: 50px; line-height: 1.6; font-size: 20px; }
            .highlight { font-weight: bold; text-decoration: underline; }
            .footer { margin-top: 100px; text-align: center; border-top: 1px solid #000; width: 200px; margin-left: auto; margin-right: auto; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${titulo}</h1>
          </div>
          <div class="content">
            ${cuerpoTexto}
            <p>Emitido el día: ${data.fecha}</p>
          </div>
          <div class="footer">
            Firma Autorizada
          </div>
        </body>
      </html>
    `;
  }

  async generateCertificateStream(data: CreateCertificateDto): Promise<Readable> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const htmlContent = this.generarHtml(data);

    await page.setContent(htmlContent);
    
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return Readable.from([Buffer.from(pdfBuffer)]);
  }
}