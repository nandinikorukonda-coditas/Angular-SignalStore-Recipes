import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RecipeStore } from '../../../core/stores/recipe-store';
import { NgFor, NgIf } from '@angular/common';
import { Button } from '../../../shared/components/button/button';
import { Recipe } from '../../../core/models/recipe-model';
import { FavouriteStore } from '../../../core/stores/favourite-store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipes',
  imports: [Card,MatFormFieldModule,MatInputModule,MatIconModule,NgFor,NgIf,Button],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recipes {
  readonly store = inject(RecipeStore);
  toast=inject(MatSnackBar);

  favouriteStore = inject(FavouriteStore);



  // ngOnInit(): void {
  //   // Load recipes on component init
  //   this.store.loadRecipes();
  // }

  toggleFavourite(recipe: Recipe) {
    this.favouriteStore.toggleFavourite(recipe);
  }
  /**
   * Search recipes by name
   * @param query - text from search input
   */
  search(query: string) {
    if (query && query.trim().length > 0) {
      this.store.searchRecipes(query.trim());
    } else {
      // If input is empty, reload all recipes
      this.store.loadRecipes();
    }
  }

  /**
   * Delete recipe by id
   * @param id - recipe id
   */
  delete(id: number) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.store.deleteRecipe(id);
      this.favouriteStore.removeFromFavourites(id);
    }
  }
  edit(id:number){
    this.toast.open('Recipe updated successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
  add(){
    this.toast.open('Recipe added successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}

