import { observer } from "mobx-react";
import { RecipeIngredient } from "./RecipeBook";
import React from "react";
import './RecipeIngredientItem.css'

  interface RecipeIngredientItemProps {
    recipeIngredient: RecipeIngredient
  }

  @observer
  export class RecipeIngredientItem extends React.Component<RecipeIngredientItemProps> {
    constructor(props: RecipeIngredientItemProps) {
      super(props)
    }

    render() {
      const recipeIngredient = this.props.recipeIngredient
      return (
        <div className='recipeingredientitem-column' >
          <div className='recipeingredientitem-name'>
            {recipeIngredient.name}
          </div>
          <div className='recipeingredient-detail'>
            Quantity: {recipeIngredient.quantity} g
          </div>
          {
            recipeIngredient.relativeRate &&
            <div className='recipeingredient-detail'>
              Percentage: {Math.round(recipeIngredient.relativeRate * 100)} %
            </div>
          }
          <div className='recipeingredient-detail'>
            Saccarose: {recipeIngredient.saccarose} %
          </div>
          <div className='recipeingredient-detail'>
            Butter: {recipeIngredient.butter} %
          </div>
        </div>
      )
    }
  }