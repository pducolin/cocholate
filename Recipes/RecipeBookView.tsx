import React from 'react';
import {observer} from 'mobx-react';
import { RecipeBook, Recipe } from './RecipeBook'
import './RecipeBook.css'
import { generateId } from '../utils/id';

interface RecipeBookProps {
  recipeBook: RecipeBook
}

@observer
export class RecipeBookView extends React.Component<RecipeBookProps> {
  constructor(props: RecipeBookProps) {
    super(props)
    this.addRecipe = this.addRecipe.bind(this)
  }

    addRecipe() {
      this.props.recipeBook.addRecipe(Object.assign(new Recipe(), {
        id: generateId('R'),
        name: 'Recipe 1',
        author: 'Test Author'
      }))
    }

  render() {
    const recipeBook = this.props.recipeBook;
    return (
        <div className='recipebook-root'>
        <button className='recipebook-button' onClick={this.addRecipe}>Add Recipe</button>
        {
          recipeBook &&
          <div className='recipebook-title'>{recipeBook.name}</div>
        }
        {
          <div className='recipebook-recipes'>
            {
              recipeBook.recipes.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe}/>
              ))
            }
          </div>
        }
        </div>
      );
    }
  }

  interface RecipeItemProps {
    recipe: Recipe
  }

  @observer
  class RecipeItem extends React.Component<RecipeItemProps> {
    constructor(props: RecipeItemProps) {
      super(props)
      this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick() {
      console.log(this.props.recipe.name + ' clicked')
    }

    render() {
      const recipe = this.props.recipe
      return (
        <div className='recipebook-recipe' onClick={this.handleItemClick}>
          <div className='recipebook-recipe-name'>
            {recipe.name}
          </div>
          <div className='recipebook-recipe-author'>
            Author: {recipe.author}
          </div>
        </div>
      )
    }
  }