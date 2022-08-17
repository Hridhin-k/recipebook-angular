import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { RecipeserviceService } from '../recipes/recipeservice.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeserviceService, private authService: AuthService) { }

  storeRecipes() {
    const recipes: any = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response)
      });
  }

  fetchRecipes() {


    return this.http.get<Recipe[]>(
      'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json',

    )
      .pipe(map(recipes => {
        console.log("enter3")

        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
          console.log("enter2")
        })
      )
  }
}

