import { Component, viewChild, inject, input } from '@angular/core';
import { Header } from '../header/header';
import { Sidenav } from '../../components/sidenav/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  imports: [Header,Sidenav,RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  sidenav = viewChild(Sidenav);
 
 
  toggleSidebar() {
    this.sidenav()?.toggle();
  }
}
