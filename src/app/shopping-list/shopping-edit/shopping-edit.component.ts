import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingserviceService } from '../shoppingservice.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput') nameInputRef: ElementRef
  // @ViewChild('amountInput') amountInputRef: ElementRef

  constructor(private list: ShoppingserviceService) { }

  ngOnInit(): void {
  }

  // onAddItem(event: any) {
  //   event.preventDefault()
  //   const ingName = this.nameInputRef.nativeElement.value;    
  //   const ingAmount = this.amountInputRef.nativeElement.value
  //   const newIngredient = new Ingredient(ingName, ingAmount)
  //   this.list.onIngredientAdded(newIngredient)

  // }
  onSubmit(form: NgForm) {
    console.log(form)
    console.log(form.value)
    const newIngredient = new Ingredient(form.value.ingredient, form.value.amount)
    this.list.onIngredientAdded(newIngredient)
  }
};



