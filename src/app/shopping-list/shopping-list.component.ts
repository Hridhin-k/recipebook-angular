import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingserviceService } from './shoppingservice.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  constructor(private list: ShoppingserviceService) { }
  private subscription: Subscription
  ngOnInit(): void {
    this.ingredients = this.list.getIngredients();
    this.subscription = this.list.ingredientsChanged.subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients })

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onEditItem(index: number) {
    this.list.startedEditing.next(index);

  }

}
