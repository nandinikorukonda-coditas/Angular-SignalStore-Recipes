import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-button',
  imports: [MatButtonModule,MatIcon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input<string>('Button');
  type = input<'primary' | 'accent' | 'warn' | 'basic'>('primary');
  disabled = input<boolean>(false);
  icon = input<string | null>(null);

  clicked = output<void>();

  onClick() {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }

}
