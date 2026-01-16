// src/app/stores/recipe-store.ts
import { inject, computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  withProps,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { RecipeService } from '../services/recipe-service';
import { AddRecipeRequest, Recipe, RecipesResponse } from '../models/recipe-model';

// --------------------
// State definition
// --------------------
export type RecipeState = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  filter: { query: string; sortBy: string; order: 'asc' | 'desc' };
};

// --------------------
// Initial state
// --------------------
const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: null,
  filter: { query: '', sortBy: 'name', order: 'asc' },
};

// --------------------
// Store
// --------------------
export const RecipeStore = signalStore(
  { providedIn: 'root' },

  // ✅ Services injected ONLY here
  withProps(() => ({
    recipeService: inject(RecipeService),
  })),

  // State
  withState(initialState),

  // Computed signals
  withComputed((store) => ({
    recipesCount: computed(() => store.recipes().length),

    sortedRecipes: computed(() =>
      [...store.recipes()].sort((a, b) => a.name.localeCompare(b.name))
    ),

    avgRating: computed(() => {
      if (!store.recipes().length) return 0;
      return (
        store.recipes().reduce((sum, r) => sum + (r.rating ?? 0), 0) /
        store.recipes().length
      ).toFixed(1);
    }),

    avgCalories: computed(() => {
      if (!store.recipes().length) return 0;
      return Math.round(
        store.recipes().reduce(
          (sum, r) => sum + (r.caloriesPerServing ?? 0),
          0
        ) / store.recipes().length
      );
    }),

    recentRecipes: computed(() =>
      [...store.recipes()].slice(-5).reverse()
    ),
  })),

  // Methods
  withMethods((store) => {
    const { recipeService } = store;

    return {
      /** Load all recipes */
      loadRecipes: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            recipeService.getAllRecipes().pipe(
              tapResponse({
                next: (res: RecipesResponse) =>
                  patchState(store, {
                    recipes: res.recipes,
                    isLoading: false,
                  }),
                error: () =>
                  patchState(store, {
                    error: 'Failed to load recipes',
                    isLoading: false,
                  }),
              })
            )
          )
        )
      ),

      /** Search recipes */
      searchRecipes: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((query) =>
            recipeService.searchRecipes(query).pipe(
              tapResponse({
                next: (res: RecipesResponse) =>
                  patchState(store, {
                    recipes: res.recipes,
                    isLoading: false,
                  }),
                error: () =>
                  patchState(store, {
                    error: 'Search failed',
                    isLoading: false,
                  }),
              })
            )
          )
        )
      ),

      /** Add recipe */
      addRecipe: rxMethod<AddRecipeRequest>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((recipe) =>
            recipeService.addRecipe(recipe).pipe(
              tapResponse({
                next: (res: Recipe) =>
                  patchState(store, ({ recipes }) => ({
                    recipes: [...recipes, res],
                    isLoading: false,
                  })),
                error: () =>
                  patchState(store, {
                    error: 'Add failed',
                    isLoading: false,
                  }),
              })
            )
          )
        )
      ),

      /** Update recipe */
      updateRecipe: rxMethod<Recipe>(
        pipe(
          tap((recipe) => console.log('Recipe received in store:', recipe)),
          tap((recipe) => console.log('Recipe ID:', recipe.id)),
          switchMap((recipe) =>
            recipeService.updateRecipe((recipe.id), recipe).pipe(
              tapResponse({
                next: (res) =>
                  patchState(store, ({ recipes }) => ({
                    recipes: recipes.map((r) =>
                      r.id === res.id ? res : r
                    ),
                    isLoading: false,
                  })),
                error: (err) => {
                  console.error('Update API error:', err);
                  patchState(store, {
                    error: 'Update failed',
                    isLoading: false,
                  });
                },
              })
            )
          )
        )
      ),
      
    

      /** Delete recipe */
      deleteRecipe: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) =>
            recipeService.deleteRecipe(id).pipe(
              tapResponse({
                next: () =>
                  patchState(store, ({ recipes }) => ({
                    recipes: recipes.filter((r) => r.id !== id),
                    isLoading: false,
                  })),
                error: () =>
                  patchState(store, {
                    error: 'Delete failed',
                    isLoading: false,
                  }),
              })
            )
          )
        )
      ),
    };
  }),

  // Hooks
  withHooks({
    onInit(store) {
      store.loadRecipes();
    },
  })
);
