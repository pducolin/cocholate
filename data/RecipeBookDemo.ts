import { RecipeBook, Recipe, Ingredient } from "../Recipes/RecipeBook";
import { generateId } from "../utils/id";


export function createDemoRecipeBook() : RecipeBook {
 let recipeBook = new RecipeBook() 
    recipeBook.name = 'Le mie ganaches'

    const cioccolato: Ingredient = {
        id: generateId('I'),
        name: 'Cioccolato',
        saccarose: 0.2,
        oil: 20,
        butter: 12,
        cocoaButter: 32,
        cocoaSolids: 23,
        lmpd: 10
    }

    const zucchero: Ingredient = {
        id: generateId('I'),
        name: 'Zucchero',
        saccarose: 20,
        oil: 0,
        butter: 0,
        cocoaButter: 0,
        cocoaSolids: 0,
        lmpd: 20
    }

    let ganache = new Recipe()
    ganache.name = 'Ganache al cioccolato'
    ganache.id = generateId('R')
    ganache.author = 'Corrado'
    ganache.addIngredient(cioccolato, 12)
    ganache.addIngredient(zucchero, 25)

    let torta = new Recipe()
    torta.name = 'Torta al cioccolato'
    torta.id = generateId('R')
    torta.author = 'Corrado'
    torta.addIngredient(cioccolato, 54)
    torta.addIngredient(zucchero, 11)

    recipeBook.addRecipe(ganache)
    recipeBook.addRecipe(torta)

    return recipeBook
}

