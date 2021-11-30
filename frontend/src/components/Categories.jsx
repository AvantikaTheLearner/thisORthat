import { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";

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
    <>
      <form onSubmit={addNewCategory}>
        <input name="category" onChange={(e) => setCategory(e.target.value)} />

        <button type="submit">
          Add new
        </button>
      </form>
      <div>{parsedCategories}</div>
    </>
  );
}
