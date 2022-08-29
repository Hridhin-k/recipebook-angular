import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { Recipe } from "./recipe.model";
import * as fromApp from '../../app/store/app.reducer'
import * as RecipeActions from './store/recipe.action'
import { map, switchMap, take } from "rxjs/operators";
import { of } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(take(1), map(RecipesState => {
      return RecipesState.recipes

    }),

      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.fetchRecipes())
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1))
        } else {
          return of(recipes)
        }
      }))



  }
}