import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { RecipeBook, Recipe } from './Recipes/RecipeBook';
import { RecipeBookView} from './Recipes/RecipeBookView'
import { generateId } from './utils/id'

const App: React.FC = () => {
  const recipeBook = new RecipeBook()
  recipeBook.name = 'Test Recipe Book'
  recipeBook.addRecipe(Object.assign(new Recipe(), {
    id: generateId('R'),
    name: 'Recipe 1',
    author: 'Test Author'
  }))
  recipeBook.addRecipe(Object.assign(new Recipe(), {
    id: generateId('R'),
    name: 'Recipe 2',
    author: 'Test Author 2'
  }))

  return (
    <div className="App">
      <RecipeBookView recipeBook={recipeBook}/>
    </div>
  );
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
