import { Component, OnInit, } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeserviceService } from '../recipeservice.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[]
  constructor(private recipeService: RecipeserviceService) { }



  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
