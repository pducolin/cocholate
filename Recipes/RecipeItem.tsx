import { observer } from "mobx-react";
import { Recipe } from "./RecipeBook";
import React from "react";
import './RecipeItem.css'
import cake from '../icons/cake.png'

  interface RecipeItemProps {
    recipe: Recipe,
    onItemClicked?: (itemId: string) => void
  }

  @observer
  export class RecipeItem extends React.Component<RecipeItemProps> {
    constructor(props: RecipeItemProps) {
      super(props)
      this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick() {
        if (this.props.onItemClicked) {
            this.props.onItemClicked(this.props.recipe.id)
        }
    }

    render() {
      const recipe = this.props.recipe
      return (
        <div className='recipeitem-main' onClick={this.handleItemClick}>
          <img src={cake} alt='cake' className='recipeitem-icon'/>
          <div className='recipeitem-details'>
            <div className='recipeitem-name'>
                {recipe.name}
            </div>
            <div className='recipeitem-author'>
                Author: {recipe.author}
            </div>
          </div>
        </div>
      )
    }
  }