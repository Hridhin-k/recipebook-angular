import { Component, Input, OnInit, } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeserviceService } from '../../recipeservice.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeserviceService) {

  }
  ngOnInit(): void {
  }
  recipeSelect() {
    this.recipeService.recipeSelected.emit(this.recipe)
  }
}  
