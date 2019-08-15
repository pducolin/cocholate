import { observer } from "mobx-react";
import { Recipe } from "./RecipeBook";
import React from "react";
import './RecipeView.css'
import { Tabs, Tab, withStyles, createStyles, Theme } from "@material-ui/core";
import { RecipeIngredientList } from "./RecipeIngredientList";
import { RecipeIngredientDetails } from "./RecipeIngredientDetails";

  interface RecipeViewProps {
    recipe: Recipe
  }

  interface StyledTabProps {
    label: string;
  }
  
  const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid black'
    },
    indicator: {
      backgroundColor: 'black',
    },
  })(Tabs);
  
  const AntTab = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: 'uppercase',
        minWidth: 50,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          color: 'black',
          opacity: 1,
        },
        '&$selected': {
          color: 'black',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: 'black',
        },
      },
      selected: {},
    }),
  )((props: StyledTabProps) => {
      return <Tab disableRipple {...props} />;
  });

  @observer 
  export class RecipeView extends React.Component<RecipeViewProps> {
    constructor(props: RecipeViewProps) {
      super(props)
      this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(value: number) {
        this.props.recipe.selectedTab = value
    }

    render() {
      const recipe = this.props.recipe
      return (
        <div className='recipeview-root'>
          <div className='recipeview-name'>
            {recipe.name}
          </div>
          <div className='recipeview-author'>
            Autore: {recipe.author}
          </div>
          {
            <AntTabs className="recipeview-menu"
                    value={recipe.selectedTab}
                    onChange={(_, v) => this.handleTabChange(v)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                    {
                        recipe.tabs.map((tab) => (
                            <AntTab key={tab} label={tab}/>
                        ))
                    }
            </AntTabs>  
          }
          <div className='recipeview-ingredients-title'>
            {recipe.tabs[recipe.selectedTab]}
          </div>
          <div id='recipeview-container'>
            {
                recipe.selectedTab === 0 &&
                <RecipeIngredientList recipe={recipe}/>  
            }
            {
                recipe.selectedTab === 1 &&
                <RecipeIngredientDetails recipe={recipe}/>  
            }
          </div>
        </div>
      )
    }
  }

