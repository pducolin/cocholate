export interface Ingredient {
    id: string;
    name: string;
    saccarose: Number;
    oil: Number;
    butter: Number;
    cocoaButter: Number;
    cocoaSolids: Number;
    lmpd: Number;
}

export interface RecipeIngredient {
    ingredientId: string;
    percentage: Number;
}

export interface Recipe {
    id: string;
    name: string;
    ingredients: Array<RecipeIngredient>;
    author: string;
}

export interface RecipeBook {
    name: string;
    ingredients: Array<Ingredient>;
    recipes: Array<Recipe>;
}