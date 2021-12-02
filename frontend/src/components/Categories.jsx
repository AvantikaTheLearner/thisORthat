import { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";
import "./Categories.css";

export default function Categories(props) {
  const { categories, setCategories } = props;
  const [category, setCategory] = useState("");

  const parsedCategories = categories.map((category) => (
    <CategoryItem key={category.id} name={category.name} />
  ));

  const addNewCategory = function (e) {
    e.preventDefault();
    axios.post("/api/categories/new", { category }).then((row) => {
      setCategories((prev) => ([
        ...prev,
        row.data
      ]));
    });
  };

  return (
    <div className="categories-container">
      <form className="categoryform" onSubmit={addNewCategory}>
        <input className="category" name="category" onChange={(e) => setCategory(e.target.value)} />

        <button className="categorybutton" type="submit">
          Add new
        </button>
      </form>
      <div className="categoryitem">
        <h2>List of Categories:</h2>
        {parsedCategories}
        </div>
    </div>
  );
}
