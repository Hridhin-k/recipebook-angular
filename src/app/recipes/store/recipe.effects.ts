import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as RecipesActions from './recipe.action'
import { Recipe } from "../recipe.model";

import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
@Injectable()
export class RecipeEffects {
  // @Effect()
  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {

        return this.http
          .get<Recipe[]>(
            'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json',
          )
      }), map((recipes) => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return new RecipesActions.SetRecipes(recipes)
      })
    )
  })
  // @Effect({ dispatch: false })
  storeRecipes = createEffect(() => {
    return this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http
          .put(
            'https://recipebook-1370f-default-rtdb.firebaseio.com/recipes.json',
            recipesState.recipes
          )
      }))
  }, { dispatch: false })

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }




} 
