import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

import * as fromApp from '../store/app.reducer'
import * as ShoppingListActions from './store/shoppingList.action'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>
  constructor(private store: Store<fromApp.AppState>) { }  //store

  private subscription: Subscription
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.list.getIngredients();
    // this.subscription = this.list.ingredientsChanged.subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients })

  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  onEditItem(index: number) {
    // this.list.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))

  }

}
