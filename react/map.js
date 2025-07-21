import "./styles.css";
import "./css/main-grid.css";
import { Controller } from "./controller";

new Controller("SaraPage");
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
import { recipes } from './data.js';
function recipeRender(recipe) {
  return (
    <div key={recipe.id}>
      <h2>{recipe.name}</h2>
      <ul>
      {recipe.ingredients.map((integ) => <li key={integ}>{integ}</li>)}
      </ul>
    </div>
  );
}
export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((r) => recipeRender(r))}
    </div>
  );
}
