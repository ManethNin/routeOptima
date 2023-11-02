import React, { createContext } from "react";

import { list } from "../data/data"

export const ShopContext = createContext(null);
export const SearchContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < list.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const getDefaultCartSizes = () => {
  let cart = {};
  for (let i = 1; i < list.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCardItems] = React.useState(getDefaultCart());
  const [cartItemSizes, setCardItemSizes] = React.useState(
    getDefaultCartSizes()
  );
  const [searchItem, setSearchItem] = React.useState(null);
  const [color, setColor] = React.useState("all");
  const [brand, setBrand] = React.useState("all");
  const [gender, setGender] = React.useState("all");
  const [bagCount, setBagCount] = React.useState(0);
  const [bagItems, setBagItems] = React.useState([]);

  const addToBag = (itemId, title, image, size, color, description, brand, price, gender) => {
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
        gender: gender
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
    // Find the index of the item with the given itemId and preSize
    const itemIndex = bagItems.findIndex(
      (item) => item.Id === itemId && item.size === preSize
    );
  
    if (itemIndex !== -1) {
      const updatedBagItems = [...bagItems];
      updatedBagItems[itemIndex].size = newSize;
      setBagItems(updatedBagItems);
    }
  };

  const addToCart = (itemId) => {
    setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    setBagCount(bagCount + 1);
  };

  const search = (itemId) => {
    setSearchItem(itemId);
  };

  const removeFromCart = (itemId) => {
    setCardItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] !== 0 ? prev[itemId] - 1 : 0,
    }));
    setBagCount(bagCount - 1);
  };

  const cahngeSize = (itemId, size) => {
    setCardItemSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    search,
    searchItem,
    color,
    setColor,
    brand,
    setBrand,
    gender,
    setGender,
    cartItemSizes,
    cahngeSize,
    bagCount,
    addToBag,
    removeFromBag,
    bagItems,
     changeSize
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
