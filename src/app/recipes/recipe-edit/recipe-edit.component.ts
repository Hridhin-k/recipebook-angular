import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { map } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.action'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription

  constructor(
    private route: ActivatedRoute,

    private router: Router,

    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.id, 'id in recipe edit component')
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = '';
    let recipeImagepath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      //const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id
        })
      })).subscribe(recipe => {
        recipeName = recipe?.name;
        recipeImagepath = recipe?.imagepath;
        recipeDescription = recipe?.description;
        if (recipe['ingredients']) {
          for (let ingredient of recipe?.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
            );
          }
        }
      }) //section 390 time 8.30
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagepath: new FormControl(recipeImagepath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagepath'],
    //   this.recipeForm.value['ingredients']
    // );

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipesActions.UpdateRecipe({ index: this.id, newrecipe: this.recipeForm.value })) //newrecipe check if abnormal
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value))
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  Onclear() {
    (<FormGroup>this.recipeForm).reset();
  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe()
    }
  }
}





