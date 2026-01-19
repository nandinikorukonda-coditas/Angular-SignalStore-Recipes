import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeStore } from '../../../core/stores/recipe-store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 
import { Card } from '../../../shared/components/card/card';
import { Table } from '../../../shared/components/table/table';
import { Button } from '../../../shared/components/button/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FavouriteStore } from '../../../core/stores/favourite-store';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../core/models/recipe-model';

@Component({
  selector: 'app-overview',
  imports: [Card, Table,Button,MatIconModule,CommonModule,MatSnackBarModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Overview {

  store=inject(RecipeStore); 
  favStore=inject(FavouriteStore) 
  toast = inject(MatSnackBar);

  editRecipe(recipe: Recipe) {
    console.log('Edit recipe', recipe);
   this.store.updateRecipe(recipe);

   
    this.toast.open('Recipe updated successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  deleteRecipe(id: number) {
    this.store.deleteRecipe(id);

   
    this.toast.open('Recipe deleted successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
   


}
