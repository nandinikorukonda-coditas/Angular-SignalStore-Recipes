import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { Recipe } from '../models/recipe-model';

export type FavouriteState = {
  favourites: Recipe[];
};

const initialState: FavouriteState = {
  favourites: [],
};

export const FavouriteStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),
  withComputed((store) => ({
    favouritesCount: computed(() => store.favourites().length),
  }))
,  

  withMethods((store) => ({
    // Add a recipe to favourites
    addToFavourites(recipe: Recipe) {
        console.log('fiuerfiuerej');
      patchState(store, {
        favourites: [...store.favourites(), recipe],
      });
    },

    // Remove a recipe from favourites
    removeFromFavourites(id: number) {
      patchState(store, {
        favourites: store.favourites().filter((r) => r.id !== id),
      });
    },

    // Toggle favourite status
    toggleFavourite(recipe: Recipe) {
      const isFav = store.favourites().some((r) => r.id === recipe.id);
      if (isFav) {
        this.removeFromFavourites(recipe.id);
      } else {
        this.addToFavourites(recipe);
      }
    },

    // Check if a recipe is favourite
    isFavourite(id: number): boolean {
      return store.favourites().some((r) => r.id === id);
    },
  }))
);
