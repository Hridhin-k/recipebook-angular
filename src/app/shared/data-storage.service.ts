import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecipeserviceService } from '../recipes/recipeservice.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
// import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
// export class DataStorageService {

//   constructor(private http: HttpClient, private recipeService: RecipeserviceService) { }
//   storeRecipes() {
//     const recipes = this.recipeService.getRecipes();
//     this.http.put('https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
//       console.log(response)
//     });
//   }
//   fetchRecipes() {
//     this.http.get<Recipe[]>('https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes => { this.recipeService.setRecipes(recipes); })
//   }
// }
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeserviceService) { }

  storeRecipes() {
    const recipes: any = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        //console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        })
      )
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}

// map(recipes => {
//   return recipes.map(recipe => {
//     return {
//       ...recipe,
//       ingredients: recipe.ingredients ? recipe.ingredients : []
//     };
//   });
// })