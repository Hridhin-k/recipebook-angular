import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RoutingComponants } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingserviceService } from './shopping-list/shoppingservice.service';
import { RecipeserviceService } from './recipes/recipeservice.service';
import { LoadingSpinnerComponent } from './shared/loadingspinner/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth/auth-intrecepter-service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shoppinglist.module';
import { AuthModule } from './auth/auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingSpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [ShoppingserviceService, RecipeserviceService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }


