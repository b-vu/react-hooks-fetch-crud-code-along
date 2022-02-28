import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(res => res.json())
    .then(data => {
      setItems(data);
    });
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const handleNewItemSubmit = newListItem => {
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newListItem)
    })
    .then(res => res.json())
    .then(data => setItems([...items, data]));
  }

  const handleCartStatus = (cartStatus, itemID) => {
    fetch(`http://localhost:4000/items/${itemID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isInCart: cartStatus
      })
    })
    .then(res => res.json())
    .then(data => {
      const newItemsArray = items.map(item => {
        if(item.id === itemID){
          return data;
        };
        return item;
      })
      setItems(newItemsArray);
    });
  }

  const handleDeletedItem = itemID => {
    fetch(`http://localhost:4000/items/${itemID}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      const newItemsArray = items.filter(item => item.id !== itemID);
      setItems(newItemsArray);
    });
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleNewItemSubmit={handleNewItemSubmit}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleCartStatus={handleCartStatus} onDeleteButtonClick={handleDeletedItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
