import { Component, output, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContent } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule,MatSidenavContent,RouterModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  @ViewChild(MatSidenav)
  private sidenav!: MatSidenav;

  createAssessment = output<void>();

  toggle() {
    this.sidenav.toggle();
  }

  onNavItemClick() {
    this.sidenav.close();
  }
}
