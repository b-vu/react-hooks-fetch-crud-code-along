import React, { useState } from "react";

function ItemForm({handleNewItemSubmit}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const handleFormSubmit = event => {
    event.preventDefault();

    handleNewItemSubmit({
      name: name,
      category: category,
      isInCart: false
    });
  }

  return (
    <form className="NewItem" onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
