import { observer } from "mobx-react";
import { Recipe } from "./RecipeBook";
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './RecipeView.css'
import { RecipeIngredientItem } from "./RecipeIngredentItem";

  interface RecipeViewProps {
    recipe: Recipe
  }

  @observer 
  export class RecipeView extends React.Component<RecipeViewProps> {
    constructor(props: RecipeViewProps) {
      super(props)
      this.handleScaleChanged = this.handleScaleChanged.bind(this)
    }

    handleScaleChanged(ingredientId: string, event: React.ChangeEvent<HTMLInputElement>) {
        const recipe = this.props.recipe
        const value = parseInt(event.target.value)
        console.log('value changed to ' + value)
        if (!value) {
            recipe.updateScale(ingredientId, 0)
        }
        else {
            recipe.updateScale(ingredientId, value)
        }
    }

    render() {
      const recipe = this.props.recipe
      return (
        <div className='recipeview-root'>
          <div className='recipeview-name'>
            {recipe.name}
          </div>
          <div className='recipeview-author'>
            Author: {recipe.author}
          </div>
          <div className='recipeview-ingredients-title'>
            Ingredients
          </div>
            <Paper className='paper'>
            <Table className='table'>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity (g)</TableCell>
                    <TableCell align="right">Quantity (%)</TableCell>
                    <TableCell align="right">Scala (g)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {recipe.ingredients.map(ingredient => (
                    <TableRow key={ingredient.id}>
                        <TableCell component="th" scope="row">
                            {ingredient.name}
                        </TableCell>
                        <TableCell align="right">{ingredient.quantity}</TableCell>
                        <TableCell align="right">{(ingredient.relativeRate*100).toFixed(1)}</TableCell>
                        <TableCell align="right">
                            <input type='text' 
                                    value={ingredient.scaledQuantity}
                                    onChange={(e) => this.handleScaleChanged(ingredient.id, e)}/>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </Paper>
        </div>
      )
    }
  }

