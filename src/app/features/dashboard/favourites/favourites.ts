import { Component, inject } from '@angular/core';
import { FavouriteStore } from '../../../core/stores/favourite-store';
import { Recipe } from '../../../core/models/recipe-model';
import { Card } from '../../../shared/components/card/card';
import { Button } from '../../../shared/components/button/button';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-favourites',
  imports: [Card,Button,CommonModule,NgIf,NgFor],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})

export class Favourites {
  favouriteStore = inject(FavouriteStore);

  removeFromFavourites(id: number) {
    this.favouriteStore.removeFromFavourites(id);
  }

  toggleFavourite(recipe: Recipe) {
    this.favouriteStore.toggleFavourite(recipe);
  }
}
