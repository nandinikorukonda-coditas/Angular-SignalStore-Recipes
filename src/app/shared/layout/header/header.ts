import { Component, output } from '@angular/core';
import { Toolbar } from '../../components/toolbar/toolbar';

@Component({
  selector: 'app-header',
  imports: [Toolbar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  toggleSidebar = output<void>();
}
