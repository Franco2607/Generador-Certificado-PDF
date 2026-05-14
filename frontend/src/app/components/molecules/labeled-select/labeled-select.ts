import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-labeled-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './labeled-select.html',
  styleUrl: './labeled-select.scss'
})
export class LabeledSelectComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onSelectChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}