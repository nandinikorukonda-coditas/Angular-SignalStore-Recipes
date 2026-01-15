import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeStore } from '../../../core/stores/recipe-store';
import { Card } from '../../../shared/components/card/card';
import { Table } from '../../../shared/components/table/table';
import { Button } from '../../../shared/components/button/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FavouriteStore } from '../../../core/stores/favourite-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [Card, Table,Button,MatIconModule,CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {

  store=inject(RecipeStore); 
  favStore=inject(FavouriteStore)  

  editRecipe(recipe: any) {
    console.log('Edit recipe', recipe);
  }
  
  deleteRecipe(id: number) {
    this.store.deleteRecipe(id);
  }


}
