import * as fromShoppingList from '../shopping-list/store/shoppingList.reducer';
import * as fromAuth from '../auth/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipes from '../recipes/store/recipe.reducer'

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: any //fromRecipes.state
}
export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer
}