import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingserviceService {
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('yogurt', 5),
    new Ingredient('honey', 5),
    new Ingredient('tomato', 5)
  ];
  getIngredients() {
    return this.ingredients;
  }
  onIngredientAdded(newIngredient: Ingredient) {

    this.ingredients.push(newIngredient)

  }
  constructor() { }
}
