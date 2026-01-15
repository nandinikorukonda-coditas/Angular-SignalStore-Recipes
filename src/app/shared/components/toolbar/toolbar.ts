import { Component, input, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Button } from '../button/button';
@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,Button],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  title = input<string>('');
  showMenu = input<boolean>(false);
  showAction = input<boolean>(false);

  actionLabel = input<string>('Action');

  menuClick = output<void>();
  actionClick = output<void>();
}
