import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { createDemoRecipeBook } from './data/RecipeBookDemo';
import { LeftBarNavigation } from './components/LeftBarNavigation';
import { ObservableNavigationItems } from './components/NavigationItems';
import { RecipeIcon, FlourIcon } from './icons/Icons';
import { RecipeBookView } from './Recipes/RecipeBookView';

const App: React.FC = () => {
  const recipeBook = createDemoRecipeBook()
  let menuItems = new ObservableNavigationItems()
  menuItems.items =
  [
    {
      title: 'Ricette',
      isSelected: true,
      icon: <RecipeIcon />
    },{
      title: 'Ingredienti',
      isSelected: false,
      icon: <FlourIcon />
    },
  ]

  return (
    <div className="App">
      <div className="App-leftMenu">
        <LeftBarNavigation observableItems={menuItems}/>
      </div>
      <main className="App-content">
        <RecipeBookView recipeBook={recipeBook}/>
      </main>
    </div>
  );
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
