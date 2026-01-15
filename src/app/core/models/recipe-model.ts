// src/app/models/recipe.model.ts

/**
 * Core recipe object
 */
export interface Recipe {
    id: number;
    name: string;
    ingredients?: string[];      // optional for select queries
    instructions?: string[];     // optional for select queries
    prepTimeMinutes?: number;
    cookTimeMinutes?: number;
    servings?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    cuisine?: string;
    caloriesPerServing?: number;
    tags?: string[];
    userId?: number;
    image?: string;
    rating?: number;
    reviewCount?: number;
    mealType?: string[];
    isDeleted?: boolean;         // for DELETE response
    deletedOn?: string;          // timestamp of deletion
  }
  
  /**
   * Generic response for multiple recipes
   */
  export interface RecipesResponse {
    recipes: Recipe[];
    total: number;
    skip: number;
    limit: number;
  }
  
  /**
   * Response for a single recipe
   */
  export type SingleRecipeResponse = Recipe;
  
  /**
   * Request body for adding a recipe
   */
  export interface AddRecipeRequest {
    name: string;
    ingredients?: string[];
    instructions?: string[];
    prepTimeMinutes?: number;
    cookTimeMinutes?: number;
    servings?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    cuisine?: string;
    caloriesPerServing?: number;
    tags?: string[];
    userId?: number;
    image?: string;
    rating?: number;
    reviewCount?: number;
    mealType?: string[];
  }
  
  /**
   * Request body for updating a recipe
   * Only send fields that you want to update
   */
  export interface UpdateRecipeRequest {
    name?: string;
    ingredients?: string[];
    instructions?: string[];
    prepTimeMinutes?: number;
    cookTimeMinutes?: number;
    servings?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    cuisine?: string;
    caloriesPerServing?: number;
    tags?: string[];
    userId?: number;
    image?: string;
    rating?: number;
    reviewCount?: number;
    mealType?: string[];
  }
  
  /**
   * Request parameters for search, pagination, and sort
   */
  export interface RecipesQueryParams {
    limit?: number;
    skip?: number;
    select?: string;       // comma-separated fields
    sortBy?: string;       // field name
    order?: 'asc' | 'desc';
    q?: string;            // search query
    tag?: string;          // filter by tag
    meal?: string;         // filter by meal type
  }
  