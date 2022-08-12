import { Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription
  isAuthenticated = false
  constructor(private datastorageservice: DataStorageService, private AuthService: AuthService) { }

  ngOnInit() {
    this.userSub = this.AuthService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true
    }
    )
  }
  onSaveData() {
    this.datastorageservice.storeRecipes();
  }
  fetchData() {
    this.datastorageservice.fetchRecipes().subscribe(response => {
      console.log(response);

    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe()

  }
}
