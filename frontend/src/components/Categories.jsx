import { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";

export default function Category(props) {
  const [categories, setCategories] = useState([]);
const [newcategory, setNewCategory] = useState("");

const parsedCategories = props.categories.map(category => (<CategoryItem key={category.id} name={category.name} />))

const newCategory = function (e) {
  e.preventDefault();
  axios
    .post("/api/categories/new", { newcategory })
    .then((rows) => {
      setCategories(rows.data);
    });
};

  return(
    <>
    <div>
      {parsedCategories}
    </div>
    <div>
    <input 
    name="category"
    onChange={(e) => setNewCategory(e.target.value)} />
    <button type="submit" onClick={newCategory}>Add new</button>
    </div>
    </>
  )
}