// import { Injectable } from '@angular/core';
// import { Ingredient } from '../shared/ingredient.model';
// import { Subject } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class ShoppingserviceService {
//   ingredientsChanged = new Subject<Ingredient[]>();
//   startedEditing = new Subject<number>();
//   // private ingredients: Ingredient[] = [
//   //   new Ingredient('apples', 5),
//   //   new Ingredient('yogurt', 5),
//   //   new Ingredient('honey', 5),
//   //   new Ingredient('tomato', 5)
//   // ];
//   private ingredients: Ingredient[] = [];
//   public index: number

//   getIngredients() {
//     return this.ingredients;

//   }
//   getIngredient(index: number) {
//     console.log("INGREDIENTS: ", this.ingredients);
//     return this.ingredients[index]
//   }

//   addIngredient(ingredient: Ingredient) {
//     this.ingredients.push(ingredient);
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }

//   addIngredients(ingredients: Ingredient[]) {
//     // for (let ingredient of ingredients) {
//     //   this.addIngredient(ingredient);
//     // }
//     this.ingredients.push(...ingredients);
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }
//   updateIngredient(index: number, newIngredient: Ingredient) {
//     this.ingredients[index] = newIngredient;
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }
//   deleteIngredient(index: number) {
//     this.ingredients.splice(index, 1);
//     this.ingredientsChanged.next(this.ingredients.slice())
//   }

//   constructor() { }
// }
