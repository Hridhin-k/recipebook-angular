import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angulartwo';
  loadedFeature = 'recipe';
  onNavigate(feature: string) {
    console.log('test2', feature)
    this.loadedFeature = feature;


  }

}
