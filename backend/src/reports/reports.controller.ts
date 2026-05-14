import { Controller, Post, Body, Res, Header } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateCertificateDto } from './dto/certificate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate-certificate')
  @Header('Content-Type', 'application/pdf')
  async generate(@Body() dto: CreateCertificateDto, @Res() res: any) {
    const stream = await this.reportsService.generateCertificateStream(dto);
    // Enviamos el flujo de datos directamente al navegador
    stream.pipe(res);
  }
}