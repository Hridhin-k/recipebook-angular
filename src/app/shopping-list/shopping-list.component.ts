import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingserviceService } from './shoppingservice.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]
  constructor(private list: ShoppingserviceService) { }

  ngOnInit(): void {
    this.ingredients = this.list.getIngredients();

  }

}
