import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeserviceService } from './recipeservice.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe[]
  constructor(private recipeService: RecipeserviceService) { }
  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe((recipe: Recipe[]) => { this.selectedRecipe = recipe })
  }

}
