import {observable, computed, autorun, reaction} from 'mobx';

export interface Ingredient {
    id: string
    name: string
    saccarose: number
    oil: number
    butter: number
    cocoaButter: number
    cocoaSolids: number
    lmpd: number
    imagePath?: string
}

export interface RecipeIngredient extends Ingredient{
    quantity: number
    relativeRate: number
    scaledQuantity: number
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
    @observable imagePath?: string

    addIngredient(ingredient: Ingredient, quantity: number) {
        this.indexedIngredients[ingredient.id] = Object.assign(ingredient, {
            quantity: quantity,
            scaledQuantity: quantity,
            relativeRate: 1
        })
        this._updateRates()
    }

    removeIngredient(ingredientId: string) {
        if (ingredientId in this.indexedIngredients) {
            delete this.indexedIngredients[ingredientId]
            this._updateRates()
        }
    }

    editIngredientQuantity(ingredientId: string, quantity: number) {
        if (ingredientId in this.indexedIngredients) {
            this.indexedIngredients[ingredientId].quantity = quantity
            this._updateRates()
        }
    }

    updateScale(ingredientId: string, scaledQuantity: number) {
        if (!(ingredientId in this.indexedIngredients)) return

        const changedIngredient = this.indexedIngredients[ingredientId]
        this.ingredients.map((ingredient) => {
            ingredient.scaledQuantity = Math.round(ingredient.relativeRate * scaledQuantity / changedIngredient.relativeRate)
        })
    }

    private _updateRates() {
        const keys = Object.keys(this.indexedIngredients)
        keys.forEach((key) => {
            this.indexedIngredients[key].relativeRate = this._ingredientRate(key)
        })
    }

    // return ingredient rate between 0.0 and 1.0
    private _ingredientRate(ingredientId: string): number {
        if (!(ingredientId in this.indexedIngredients) || this.totalQuantity === 0) {
            return 0
        }

        return this.indexedIngredients[ingredientId].quantity / this.totalQuantity
    }

    @computed get totalQuantity() : number {
        const ingredientIds = Object.keys(this.indexedIngredients)
        return ingredientIds.reduce((totalQuantity: number, ingredientId: string) : number => {
            const ingredient = this.indexedIngredients[ingredientId]
            totalQuantity += ingredient.quantity
            return totalQuantity
        }, 0)
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
    @observable selectedRecipe?: Recipe

    addRecipe(recipe: Recipe) {
        this.indexedRecipes[recipe.id] = recipe
    }

    removeRecipe(recipeId: string) {
        if (recipeId in this.indexedRecipes) {
            delete this.indexedRecipes[recipeId]
        }
    }

    selectRecipe(recipeId: string) {
        if (recipeId in this.indexedRecipes) {
            this.selectedRecipe = this.indexedRecipes[recipeId]
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
