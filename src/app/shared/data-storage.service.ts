// import { Injectable, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
// import { RecipeserviceService } from '../recipes/recipeservice.service';
// import { Recipe } from '../recipes/recipe.model';
// import { map, take, tap } from 'rxjs/operators';

// import { Store } from '@ngrx/store';
// import * as RecipesActions from '../recipes/store/recipe.action';
// import * as  fromApp from '../../app/store/app.reducer'

// @Injectable({
//   providedIn: 'root'
// })
// export class DataStorageService {
//   constructor(private http: HttpClient, private recipeService: RecipeserviceService, private store: Store<fromApp.AppState>) { }

//   storeRecipes() {
//     const recipes: any = this.recipeService.getRecipes();
//     this.http
//       .put(
//         'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json',
//         recipes
//       )
//       .subscribe(response => {
//         console.log(response)
//       });
//   }

//   fetchRecipes() {


//     return this.http.get<Recipe[]>(
//       'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json',

//     )
//       .pipe(map(recipes => {
//         console.log("enter3")

//         return recipes.map(recipe => {
//           return {
//             ...recipe,
//             ingredients: recipe.ingredients ? recipe.ingredients : []
//           };
//         });
//       }),
//         tap(recipes => {
//           // this.recipeService.setRecipes(recipes);
//           this.store.dispatch(new RecipesActions.SetRecipes(recipes))
//         })
//       )
//   }
// }

