import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatCardModule,MatIcon,CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  title = input<string>();
  value = input<string | number>();
  icon = input<string | null>(null);
}
