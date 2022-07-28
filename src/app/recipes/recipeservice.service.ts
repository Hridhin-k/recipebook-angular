import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeserviceService {
  recipeSelected = new EventEmitter<Recipe>()
  recipes: Recipe[] = [
    new Recipe('MEAT AND BROCHOLI', "Beef & broccoli is an American dish consisting of pieces of flank steak that are stir-fried with broccoli and seasoned with a Chinese-style sauce made with oyster sauce, soy sauce, and cornstarch. The dish has Chinese influences, although it is not originally Chinese, but it is believed that the first versions of the dish were prepared by Chinese immigrants who had settled in San Francisco."

      , 'https://live.staticflickr.com/65535/48588252551_16d7043332_h.jpg'),
    new Recipe('CHICKEN POPS', 'What is Popcorn Chicken? Popcorn chicken are bite-sized tender and crisp chunks of chicken that have been seasoned, breaded and deep fried to perfection, until golden. Since the breaded tiny chunks resemble popcorn, they are named as popcorn chicken', 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/px1420302-image-kwyqfu1h.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=936c04d1bd717c960d7fcf01d5c576f1'),
    new Recipe('LASAGNA', 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Cajun-Chicken-Lasagna_EXPS_HSCBZ19_129791_E07_12_2b-9.jpg?fit=700,1024'),
    new Recipe('BBQ CHICKEN', 'Barbecue chicken consists of chicken parts or entire chickens that are barbecued, grilled or smoked. There are many global and regional preparation techniques and cooking styles. Barbecue chicken is often seasoned or coated in a spice rub, barbecue sauce, or both.', 'https://assets.epicurious.com/photos/5732526f1877f76a0e20831c/1:1/w_1920,c_limit/EP_05102016_PeruvianStyleRoastChicken_recipe_.jpg'),
  ];
  getRecipes() {
    return this.recipes.slice();
  }
  constructor() { }
}
