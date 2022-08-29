import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';



import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/auth/store/auth.action'
import * as RecipeActions from '../recipes/store/recipe.action'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription
  isAuthenticated = false;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user
      console.log(this.isAuthenticated, 'auth check2')
    }
    )
  }
  onSaveData() {
    //this.datastorageservice.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes())
  }
  fetchData() {
    // this.datastorageservice.fetchRecipes().subscribe(response => {})
    this.store.dispatch(new RecipeActions.fetchRecipes())
  }
  logout() {
    this.store.dispatch(new AuthActions.Logout)
  }
  ngOnDestroy() {
    this.userSub.unsubscribe()

  }
}
