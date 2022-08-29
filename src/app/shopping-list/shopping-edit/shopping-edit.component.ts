import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShoppingListActions from '../store/shoppingList.action';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromShoppingList from '../store/shoppingList.reducer'


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editmode: boolean = false;
  subscription: Subscription

  editedItem: Ingredient
  @ViewChild('f') slForm: NgForm
  shoppingList$: Observable<fromShoppingList.AppState>;
  constructor(private store: Store<fromShoppingList.AppState>) { }


  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editmode = true;
        this.editedItem = stateData.editedIngredient
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editmode = false
      }
    })


  }
  onSubmit(form: NgForm) {

    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editmode) {
      //this.list.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListActions.updateingredient(newIngredient))
    } else {
      //this.list.addIngredient(newIngredient)
      this.store.dispatch(new ShoppingListActions.addIngredient(newIngredient));
    }
    this.editmode = false
  }
  onClear() {
    this.slForm.reset();
    this.editmode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
  onDelete() {
    //this.list.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.deleteIngredient())


    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
};














