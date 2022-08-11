import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingserviceService } from '../shoppingservice.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  editmode: boolean = false;
  subscription: Subscription
  editedItemIndex: number;
  editedItem: Ingredient
  @ViewChild('f') slForm: NgForm
  constructor(private list: ShoppingserviceService, private fb: FormBuilder) { }


  ngOnInit() {
    this.subscription = this.list.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index
      this.editmode = true;
      this.editedItem = this.list.getIngredient(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })

    });

  }
  onSubmit(form: NgForm) {

    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editmode) {
      this.list.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.list.addIngredient(newIngredient)
    }
    this.editmode = false
  }
  onClear() {
    this.slForm.reset();
    this.editmode = false;
  }
  onDelete() {
    this.list.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
};














// onAddItem(event: any) {
  //   event.preventDefault()
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value
  //   const newIngredient = new Ingredient(ingName, ingAmount)
  //   this.list.onIngredientAdded(newIngredient)

  // }
  // onSubmit(form: NgForm) {
  //   console.log(form)
  //   console.log(form.value)
  //   const newIngredient = new Ingredient(form.value.ingredient, form.value.amount)
  //   this.list.onIngredientAdded(newIngredient)
  // }
