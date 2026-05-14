import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseInputComponent } from '../../atoms/base-input/base-input';

@Component({
  selector: 'app-labeled-input',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseInputComponent], // Asegúrate de tener BaseInputComponent aquí
  templateUrl: './labeled-input.html',
  styleUrl: './labeled-input.scss'
})
export class LabeledInputComponent {
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() required: boolean = false;
  @Input() iconPath: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInputChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}