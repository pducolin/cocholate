import { Recipe } from "./RecipeBook";
import React from "react";
import { observer } from "mobx-react";


interface RecipeIngredientListProps {
    recipe: Recipe
}

@observer
export class RecipeIngredientList extends React.Component<RecipeIngredientListProps> {
    constructor(props: RecipeIngredientListProps) {
        super(props)
        this.handleScaledIngredientChanged = this.handleScaledIngredientChanged.bind(this)
        this.handleTotalScaledQuantityChanged = this.handleTotalScaledQuantityChanged.bind(this)
    }

    handleScaledIngredientChanged(ingId: string, value: number) {
        this.props.recipe.updateScale(ingId, value)
    }

    handleTotalScaledQuantityChanged(value: number) {
        this.props.recipe.updateTotalScale(value)
    }

    render () {
        const recipe = this.props.recipe
        return (
            <div className="table-container">
                <table className="recipeview-table">
                    <thead>
                        <tr>
                        <th className="row-name">Name</th>
                        <th>Quantity (g)</th>
                        <th>Quantity (%)</th>
                        <th>Scala (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipe.ingredients.map(ingredient => (
                                <tr key={ingredient.id}>
                                    <td className="row-name">
                                        {ingredient.name}
                                    </td>
                                    <td>{(ingredient.quantity).toFixed(1)}</td>
                                    <td>{(ingredient.relativeRate*100).toFixed(1)}</td>
                                    <td>
                                        <input type='number'
                                                step="0.1" 
                                                value={(ingredient.scaledQuantity).toFixed(1)}
                                                onChange={(e) => {
                                                    const parsedValue = Math.round(parseFloat(e.target.value) * 10) / 10
                                                    console.log('value changed to ' + parsedValue)
                                                    if (parsedValue) {
                                                        this.handleScaledIngredientChanged(ingredient.id, parsedValue)
                                                    } else {
                                                        this.handleScaledIngredientChanged(ingredient.id, 0)
                                                    }
                                                }}/>
                                    </td>
                                </tr>
                            ))}
                        <tr className="footer">
                            <td>Totale</td>
                            <td>{(recipe.totalQuantity).toFixed(1)}</td>
                            <td colSpan={2} align="right">
                                <input type='number'
                                        step="0.1"
                                        value={(recipe.totalScaledQuantity).toFixed(1)}
                                        onChange={(e) => {
                                            const parsedValue = Math.round(parseFloat(e.target.value) * 10) / 10
                                            if (parsedValue) {
                                                this.handleTotalScaledQuantityChanged(parsedValue)
                                            } else {
                                                this.handleTotalScaledQuantityChanged(0)
                                            }
                                        }}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}