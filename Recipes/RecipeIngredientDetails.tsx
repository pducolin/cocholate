import { Recipe } from "./RecipeBook";
import React from "react";
import { observer } from "mobx-react";

interface RecipeIngredientDetailsProps {
    recipe: Recipe
}

@observer
export class RecipeIngredientDetails extends React.Component<RecipeIngredientDetailsProps> {    
    constructor(props: RecipeIngredientDetailsProps) {
        super(props)
    }

    render () {
        const recipe = this.props.recipe
        return (
            <div className="table-container">
                <table className="recipeview-table">
                    <thead>
                    <tr>
                        <th className="row-name">Name</th>
                        <th>Saccarose (%)</th>
                        <th>Oil (%)</th>
                        <th>Butter (%)</th>
                        <th>Cocoa Butter (%)</th>
                        <th>Cocoa Solid (%)</th>
                        <th>LMPD (%)</th>
                    </tr>
                    </thead>
                    <tbody>
                        {recipe.ingredients.map(ingredient => (
                            <tr key={ingredient.id}>
                                <td className="row-name">
                                    {ingredient.name}
                                </td>
                                <td>{(ingredient.saccarose*ingredient.relativeRate).toFixed(1)}</td>
                                <td>{(ingredient.oil*ingredient.relativeRate).toFixed(1)}</td>
                                <td>{(ingredient.butter*ingredient.relativeRate).toFixed(1)}</td>
                                <td>{(ingredient.cocoaButter*ingredient.relativeRate).toFixed(1)}</td>
                                <td>{(ingredient.cocoaSolids*ingredient.relativeRate).toFixed(1)}</td>
                                <td>{(ingredient.lmpd*ingredient.relativeRate).toFixed(1)}</td>
                            </tr>
                        ))}
                        <tr className="footer">
                            <td>
                                Totale
                            </td>
                            <td>{recipe.totalSaccarose.toFixed(1)}</td>
                            <td>{recipe.totalOil.toFixed(1)}</td>
                            <td>{recipe.totalButter.toFixed(1)}</td>
                            <td>{recipe.totalCocoaButter.toFixed(1)}</td>
                            <td>{recipe.totalCocoaSolid.toFixed(1)}</td>
                            <td>{recipe.totalLPMD.toFixed(1)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}