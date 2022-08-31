
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ImagepreviewComponent } from "./recipe-details/imagepreview/imagepreview/imagepreview.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";

import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipe-routing.module";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { NgxImgZoomModule } from 'ngx-img-zoom'
import { NgxImageZoomModule } from 'ngx-image-zoom'
import { AngularImageViewerModule } from 'angular-x-image-viewer';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    ImagepreviewComponent

  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    NgxImageZoomModule,
    NgxImgZoomModule,
    AngularImageViewerModule

  ]
})
export class RecipesModule { }
