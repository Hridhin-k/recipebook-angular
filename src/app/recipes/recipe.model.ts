export class Recipe {
  public name: string;
  public description: string;
  // public ingredients: any;
  public imagepath: string;
  constructor(name: string, desc: string, imagepath: string,) {
    this.name = name;
    this.description = desc;
    // this.ingredients = ingre;
    this.imagepath = imagepath;

  }
} 