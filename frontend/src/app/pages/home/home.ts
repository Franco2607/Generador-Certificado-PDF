import { Component } from '@angular/core';
import { CertificateFormComponent } from '../../components/organisms/certificate-form/certificate-form';

@Component({
  selector: 'app-home',
  imports: [CertificateFormComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
