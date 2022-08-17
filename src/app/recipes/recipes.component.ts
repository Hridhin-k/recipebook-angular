import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeserviceService } from './recipeservice.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe[]
  constructor(private recipeService: RecipeserviceService, private dataStorage: DataStorageService) { }
  ngOnInit(): void {
    this.dataStorage.fetchRecipes().subscribe()
    this.recipeService.recipesChanged.subscribe((recipe: Recipe[]) => { this.selectedRecipe = recipe })

  }

}
