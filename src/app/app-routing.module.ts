import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [{ path: 'recipes', component: RecipesComponent },
{ path: 'shoppinglist', component: ShoppingListComponent }]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponants = [RecipesComponent, ShoppingListComponent]