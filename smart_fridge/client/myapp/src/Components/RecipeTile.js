import React from "react";
import "./RecipeTile.css";

export default function RecipeTile({ recipe }) {
  return (
    recipe["recipe"]["image"].match(/\.(jpeg|jpg|gif|png)/) != null && (
      <div className="card2">
        <a href={recipe["recipe"]["url"]} target="_blank">
          <img className="recipeTile__img" src={recipe["recipe"]["image"]} />
          <h3 className="recipeTile__name">{recipe["recipe"]["label"]}</h3>
        </a>
        {/* <a href={'recipe["recipe"]["url"]')}></a> */}
      </div>
    )
  );
}
