import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeserviceService } from '../recipeservice.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Params } from '@angular/router';
// import { RecipeserviceService } from '../recipeservice.service';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeserviceService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipes(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName: string = '';
    let recipeImagePath = '';
    let recipeDescription: string = '';
    let recipeIngredients: any = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagepath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          console.log(ingredient.name)
          console.log(ingredient.amount)
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    });
  }

}






// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Params } from '@angular/router';
// import { RecipeserviceService } from '../recipeservice.service';
// @Component({
//   selector: 'app-recipe-edit',
//   templateUrl: './recipe-edit.component.html',
//   styleUrls: ['./recipe-edit.component.css']
// })
// export class RecipeEditComponent implements OnInit {
//   id: number;
//   editmode: boolean = false;
//   recipeForm: FormGroup;
//   constructor(private route: ActivatedRoute, private recipeService: RecipeserviceService) { }
//   ngOnInit() {
//     this.route.params.subscribe((params: Params) => {
//       this.id = +params["id"];
//       this.editmode = params['id'] != null
//       this.initForm();
//     })

//   }
//   onSubmit() {
//     console.log('this.recipeForm')
//   }
//   get controls() { // a getter!
//     return (<FormArray>this.recipeForm.get('ingredients')).controls;
//   }
//   private initForm() {
//     let recipeName = '';
//     let recipeImagePath = '';
//     let recipeDescription = '';
//     let recipeIngredients: any = new FormArray([]);
//     if (this.editmode) {
//       const recipe = this.recipeService.getRecipe(this.id)
//       recipeName = recipe.name;
//       recipeImagePath = recipe.imagepath;
//       recipeDescription = recipe.description;

//       if (recipe['ingredients']) {
//         for (let ingredient of recipe.ingredients) {
//           recipeIngredients.push(
//             new FormGroup({
//               name: new FormControl(ingredient.name),
//               amount: new FormControl(ingredient.amount)
//             }))

//         }

//       }
//       this.recipeForm = new FormGroup({
//         'name': new FormControl(recipeName),
//         'imagepath': new FormControl(recipeImagePath),
//         'description': new FormControl(recipeDescription),
//         'ingredients': recipeIngredients
//       });

//     }
//   }
// }





