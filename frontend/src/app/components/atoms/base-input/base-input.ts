import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-input.html',
  styleUrl: './base-input.scss'
})
export class BaseInputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() hasIcon: boolean = false; 

  @Output() valueChange = new EventEmitter<string>();

  onChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}