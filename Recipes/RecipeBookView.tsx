import React from 'react';
import {observer} from 'mobx-react';
import { RecipeBook, Recipe } from './RecipeBook'
import './RecipeBook.css'
import { generateId } from '../utils/id';
import { RecipeItem } from './RecipeItem'
import { RecipeView } from './RecipeView';
import { LeftBarNavigation } from '../components/LeftBarNavigation';
import { ObservableNavigationItems } from '../components/NavigationItems';
import { throwStatement } from '@babel/types';
import { FlourIcon, RecipeIcon } from '../icons/Icons';

interface RecipeBookProps {
  recipeBook: RecipeBook
}

@observer
export class RecipeBookView extends React.Component<RecipeBookProps> {
  
  constructor(props: RecipeBookProps) {
    super(props)
    this.addRecipe = this.addRecipe.bind(this)
    this.onItemClicked = this.onItemClicked.bind(this)
  }

  addRecipe() {
    this.props.recipeBook.addRecipe(Object.assign(new Recipe(), {
      id: generateId('R'),
      name: 'Recipe 1',
      author: 'Test Author'
    }))
  }

  onItemClicked(recipeId: string) {
    this.props.recipeBook.selectRecipe(recipeId)
  }

  render() {
    const recipeBook = this.props.recipeBook;

    return (
      <div className='recipebook-root'>
          {
            recipeBook &&
            <div className='recipebook-title'>{recipeBook.name}</div>
          }
          {
            <div className='recipebook-recipes'>
              {
                recipeBook.recipes.map((recipe) => (
                  <RecipeItem key={recipe.id} 
                              recipe={recipe}
                              onItemClicked={this.onItemClicked}/>
                ))
              }
            </div>
          }
          {
            recipeBook.selectedRecipe && 
            <RecipeView recipe={recipeBook.selectedRecipe}/>
          }
        </div>
      );
    }
  }
