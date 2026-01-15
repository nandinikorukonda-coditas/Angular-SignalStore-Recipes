import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Recipe,
  RecipesResponse,
  AddRecipeRequest,
  UpdateRecipeRequest,
  RecipesQueryParams,
} from '../models/recipe-model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'https://dummyjson.com/recipes';

  http=inject(HttpClient);

  /** Get all recipes with optional query params (pagination, select, sort) */
  getAllRecipes(params?: RecipesQueryParams): Observable<RecipesResponse> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) httpParams = httpParams.set(key, value.toString());
      });
    }
    return this.http.get<RecipesResponse>(`${this.baseUrl}`, { params: httpParams });
  }

  /** Search recipes by query string */
  searchRecipes(query: string): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(`${this.baseUrl}/search`, { params: { q: query } });
  }

  /** Add a new recipe (simulated) */
  addRecipe(recipe: AddRecipeRequest): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/add`, recipe);
  }

  /** Update a recipe by ID */
  updateRecipe(id: number, recipe: UpdateRecipeRequest): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/${id}`, recipe);
  }

  /** Delete a recipe by ID */
  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.baseUrl}/${id}`);
  }

  /** Get recipes by tag */
  getByTag(tag: string, params?: RecipesQueryParams): Observable<RecipesResponse> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) httpParams = httpParams.set(key, value.toString());
      });
    }
    return this.http.get<RecipesResponse>(`${this.baseUrl}/tag/${tag}`, { params: httpParams });
  }

  /** Get recipes by meal type */
  getByMeal(meal: string, params?: RecipesQueryParams): Observable<RecipesResponse> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) httpParams = httpParams.set(key, value.toString());
      });
    }
    return this.http.get<RecipesResponse>(`${this.baseUrl}/meal-type/${meal}`, { params: httpParams });
  }
}
