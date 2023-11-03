import React, { createContext } from "react";

import { quantity_list } from "../data/data";

export const ShopContext = createContext(null);
export const SearchContext = createContext(null);

function getAvailableSizes(modelId) {


  const matchingEntries = quantity_list.filter(
    (entry) => entry.model_id === modelId
  );
  const availableSizes = matchingEntries.map((entry) => entry.size);
  const uniqueSizes = [...new Set(availableSizes)];
  return uniqueSizes;
}

export const ShopContextProvider = (props) => {

  const [bagCount, setBagCount] = React.useState(0);
  const [bagItems, setBagItems] = React.useState([]);

  const addToBag = (
    itemId,
    title,
    image,
    size,
    color,
    description,
    brand,
    price,
    gender
  ) => {
    setBagCount(bagItems.length);
    const existingItemIndex = bagItems.findIndex(
      (item) => item.id === itemId && item.size === size
    );

    if (existingItemIndex !== -1) {
      const updatedBagItems = [...bagItems];
      updatedBagItems[existingItemIndex].quantity += 1;
      setBagItems(updatedBagItems);
    } else {
      const newItem = {
        id: itemId,
        img: image,
        title: title,
        description: description,
        brand: brand,
        color: color,
        quantity: 1,
        size: size,
        price: price,
        gender: gender,
      };
      setBagItems([...bagItems, newItem]);
    }
    setBagCount(bagCount + 1);
  };

  const removeFromBag = (itemId, size) => {
    const itemIndex = bagItems.findIndex(
      (item) => item.id === itemId && item.size === size
    );

    if (itemIndex !== -1) {
      const updatedBagItems = [...bagItems];
      updatedBagItems[itemIndex].quantity -= 1;

      if (updatedBagItems[itemIndex].quantity === 0) {
        updatedBagItems.splice(itemIndex, 1);
      }
      setBagItems(updatedBagItems);
    }
    setBagCount(bagCount - 1);
  };

  const changeSize = (itemId, preSize, newSize) => {
    const itemIndex = bagItems.findIndex(
      (item) => item.Id === itemId && item.size === preSize
    );

    if (itemIndex !== -1) {
      const updatedBagItems = [...bagItems];
      updatedBagItems[itemIndex].size = newSize;
      setBagItems(updatedBagItems);
    }
  };

  const contextValue = {
    bagCount,
    addToBag,
    removeFromBag,
    bagItems,
    changeSize,
    getAvailableSizes,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
