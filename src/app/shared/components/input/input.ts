import { Component, input, output, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-input',
  imports: [MatInputModule,MatFormFieldModule,MatIconModule,FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  label = input<string>('Label');
  placeholder = input<string>('');
  type = input<'text' | 'password' | 'email' | 'number'>('text');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  icon = input<string | null>(null);

  value = signal<string>('');

  valueChange = output<string>();

  onInput(value: string) {
    this.value.set(value);
    this.valueChange.emit(value);
  }
}
