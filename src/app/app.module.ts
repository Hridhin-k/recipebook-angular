import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ShoppingserviceService } from './shopping-list/shoppingservice.service';
import { LoadingSpinnerComponent } from './shared/loadingspinner/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth/auth-intrecepter-service';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ShoppingListModule } from './shopping-list/shoppinglist.module';
import { AuthModule } from './auth/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'
import { RecipeEffects } from './recipes/store/recipe.effects';
//import { CoreModule } from './core.module';
//import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    ShoppingListModule,
    AuthModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// @NgModule({
//   declarations: [AppComponent, HeaderComponent],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     AppRoutingModule,
//     StoreModule.forRoot(fromApp.appReducer),
//     EffectsModule.forRoot([AuthEffects, RecipeEffects]),
//     StoreDevtoolsModule.instrument({ logOnly: environment.production }),
//     StoreRouterConnectingModule.forRoot(),
//     SharedModule,
//     CoreModule
//   ],
//   bootstrap: [AppComponent]
//   // providers: [LoggingService]
// })
// export class AppModule { }

