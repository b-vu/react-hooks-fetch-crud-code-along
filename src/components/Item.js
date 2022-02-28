import React from "react";

function Item({ item, handleCartStatus, onDeleteButtonClick }) {
  const onCartClick = () => {
    handleCartStatus(!item.isInCart, item.id);
  }

  const handleDeleteButtonClick = () => {
    onDeleteButtonClick(item.id);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={() => onCartClick()} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={() => handleDeleteButtonClick()}>Delete</button>
    </li>
  );
}

export default Item;
