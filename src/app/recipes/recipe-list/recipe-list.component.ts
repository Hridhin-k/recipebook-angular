import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('MEAT AND BROCHOLI', 'this is a test recipe', 'https://live.staticflickr.com/65535/48588252551_16d7043332_h.jpg'),
    new Recipe('CHICKEN POPS', 'this is a test recipe', 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/px1420302-image-kwyqfu1h.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=936c04d1bd717c960d7fcf01d5c576f1'),
    new Recipe('LASAGNA', 'this is a test recipe', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Cajun-Chicken-Lasagna_EXPS_HSCBZ19_129791_E07_12_2b-9.jpg?fit=700,1024'),
    new Recipe('BBQ CHICKEN', 'this is a test recipe', 'https://assets.epicurious.com/photos/5732526f1877f76a0e20831c/1:1/w_1920,c_limit/EP_05102016_PeruvianStyleRoastChicken_recipe_.jpg'),
  ];
  constructor() { }



  ngOnInit(): void {
  }

}
