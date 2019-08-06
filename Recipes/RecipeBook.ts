import {observable, computed} from 'mobx';
import { object } from 'prop-types';

interface Ingredient {
    id: string;
    name: string;
    saccarose: number;
    oil: number;
    butter: number;
    cocoaButter: number;
    cocoaSolids: number;
    lmpd: number;
}

export interface RecipeIngredient {
    ingredient: Ingredient
    quantity: number
}

export interface IndexedRecipeIngredient {
    [id: string]: RecipeIngredient
}

export interface IndexedIngredientRate {
    [id: string]: number
}

export class Recipe {
    @observable id: string = ''
    @observable name: string = ''
    @observable indexedIngredients: IndexedRecipeIngredient = {}
    @observable author: string = ''

    addIngredient(ingredient: Ingredient, quantity: number) {
        this.indexedIngredients[ingredient.id] = {
            ingredient: ingredient,
            quantity: quantity
        }
    }

    removeIngredient(ingredientId: string) {
        if (ingredientId in this.indexedIngredients) {
            delete this.indexedIngredients[ingredientId]
        }
    }

    editIngredientQuantity(ingredientId: string, quantity: number) {
        if (ingredientId in this.indexedIngredients) {
            this.indexedIngredients[ingredientId].quantity = quantity
        }
    }

    @computed get totalQuantity() : number {
        const ingredientIds = Object.keys(this.indexedIngredients)
        return ingredientIds.reduce((totalQuantity: number, ingredientId: string) : number => {
            const ingredient = this.indexedIngredients[ingredientId]
            totalQuantity += ingredient.quantity
            return totalQuantity
        }, 0)
    }

    @computed get recipeIngredientRates() : IndexedIngredientRate {
        const keys = Object.keys(this.indexedIngredients)
        return keys.reduce((_indexedRates: IndexedIngredientRate, ingId: string) => {
            _indexedRates[ingId] = this.ingredientRate(ingId)
            return _indexedRates
        }, {})
    }

    // return ingredient rate between 0.0 and 1.0
    ingredientRate(ingredientId: string): number {
        if (!(ingredientId in this.indexedIngredients) || this.totalQuantity === 0) {
            return 0
        }

        return this.indexedIngredients[ingredientId].quantity / this.totalQuantity
    }

    @computed get ingredients() : RecipeIngredient[] {
        return Object.values(this.indexedIngredients)
    }
}

interface IndexedRecipes {
    [id: string]: Recipe
}

export class RecipeBook {
    @observable name: string = ''
    @observable indexedRecipes: IndexedRecipes = {}

    addRecipe(recipe: Recipe) {
        this.indexedRecipes[recipe.id] = recipe
    }

    removeRecipe(recipeId: string) {
        if (recipeId in this.indexedRecipes) {
            delete this.indexedRecipes[recipeId]
        }
    }

    @computed get recipes() : Recipe[] {
        return Object.values(this.indexedRecipes)
    }

    @computed get recipesCount() : number {
        return this.recipes.length
    }
}

export const recipeBook = new RecipeBook()
