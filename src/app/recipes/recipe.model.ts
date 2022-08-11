import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public ingredients: Ingredient[];
  public imagepath: string;
  constructor(name: string, desc: string, imagepath: string, ingredient: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.ingredients = ingredient;
    this.imagepath = imagepath;

  }
} 