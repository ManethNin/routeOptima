import React, { useContext } from "react";
import "./Bag.css";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  CardFooter,
  Input,
  Image,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { AiFillMinusSquare } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Search } from "../../components/Search/Search";
import { ShopContext } from "../../context/shopContextProvider";

import { sizes, list } from "../../data/data";
import { Navigation } from "../../components/Navigation/Navigation";

export const Bag = () => {
  const {
    addToCart,
    cartItems,
    removeFromCart,
    cartItemSizes,
    cahngeSize,
    bagItems,
    addToBag,
    removeFromBag,
    changeSize,
  } = useContext(ShopContext);

  const getTot = () => {
    let sum = 0;
    bagItems.map((item) => {
      sum += item.price * item.quantity;
    });
    return sum;
  };
  return (
    <>
      <Navigation active={8} />
      <Search />

      <h1>Sopping Bag</h1>
      <div className="bag-list">
        <Table aria-label="Example static collection table" isStriped>
          <TableHeader>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>SIZE(UK)</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>QUANTITY</TableColumn>
            <TableColumn>SUB TOTAL</TableColumn>
          </TableHeader>
          <TableBody>
            {bagItems
              .filter((item) => item.quantity > 0)
              .map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="product-card">
                      <div className="product-image">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={product.title}
                          className="w-full object-cover h-[140px]"
                          src={product.img}
                        />
                      </div>
                      <div className="product-detail">
                        <p className="product-name">{product.title}</p>
                        <p className="card-gender">
                          {product.gender.charAt(0).toUpperCase() +
                            product.gender.slice(1)}{" "}
                          |{" "}
                          {product.brand.charAt(0).toUpperCase() +
                            product.brand.slice(1)}{" "} 
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="select-size-cart">
                      <select
                        defaultValue={product.size}
                        placeholder={cartItemSizes[product.id]}
                        labelPlacement="outside-left"
                        className="max"
                        onChange={(e) => {
                          changeSize(product.id, product.size, e.target.value);
                        }}
                      >
                        {sizes.map((size) => (
                          <option
                            key={size}
                            value={size}
                          >
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="price">
                      SLRs {product.price.toLocaleString("en-US")}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="quantity">
                      <button
                        onClick={() => removeFromBag(product.id, product.size)}
                      >
                        -
                      </button>
                      <p>{product.quantity}</p>
                      <button
                        onClick={() => {
                          addToBag(
                            product.id,
                            product.title,
                            product.img,
                            product.size,
                            product.color,
                            product.description,
                            product.brand,
                            product.price,
                            product.gender
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="price">
                      SLRs{" "}
                      {(product.price * product.quantity).toLocaleString(
                        "en-US"
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell>
                {" "}
                <Link to="/paymentgateway">
                  <Button disabled={bagItems.length === 0} fullWidth>Proceed to Checkout</Button>
                </Link>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <p className="price">Total</p>
              </TableCell>
              <TableCell>
                <p className="price">SLRs {getTot().toLocaleString("en-US")}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};
