import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RecipeStore } from '../../../core/stores/recipe-store';
import { NgFor, NgIf } from '@angular/common';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-recipes',
  imports: [Card,MatFormFieldModule,MatInputModule,MatIconModule,NgFor,NgIf,Button],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recipes {
  readonly store = inject(RecipeStore);

  constructor() {}

  ngOnInit(): void {
    // Load recipes on component init
    this.store.loadRecipes();
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
    }
  }
}
