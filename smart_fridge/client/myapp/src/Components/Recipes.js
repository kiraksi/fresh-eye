import { useState } from "react";
import axios from "axios";
import "./Recipes.css";
import RecipeTile from "./RecipeTile";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";

function Recipes() {
    const { setCurrent2 } = useContext(GlobalContext);
    
    const [query, setquery] = useState("");
    const [recipes, setrecipes] = useState([]);
    const [healthLabel, sethealthLabel] = useState("vegan");

    setCurrent2("recipes");
    const YOUR_APP_ID = "139b9216";
    const YOUR_APP_KEY = "5e140ad50d5d2b4df3e2d7710e3b6a45";

    var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

    async function getRecipes() {
        var result = await axios.get(url);
        setrecipes(result.data.hits);
        console.log(result.data);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getRecipes();
    };

    return (
        <div className="recipe_app">
            <h1>Food Recipes</h1>
            <form className="app__searchForm" onSubmit={onSubmit}>
                <input
                    type="text"
                    className="app__input"
                    placeholder="Enter ingredients..."
                    value={query}
                    onChange={(e) => setquery(e.target.value)}
                />
                <input className="app__submit" type="submit" value="Search" />
            </form>

            <div className="card_container">
                {recipes.map((recipe) => {
                    return <RecipeTile recipe={recipe} />;
                })}
            </div>
        </div>
    );
}

export default Recipes;
