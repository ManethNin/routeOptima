import React, { useContext, useEffect } from "react";
import "./Bag.css";
import * as reqSend from '../../data/reqSender'
import { storeData } from "../../data/data";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Link } from "react-router-dom";
import { Search } from "../../components/Search/Search";
import { ShopContext } from "../../context/shopContextProvider";
import { Navigation } from "../../components/Navigation/Navigation";

export const Bag = () => {
  const [store, setStore] = React.useState(null);
  const [route, setRoute] = React.useState(null);
  const [routes, setRoutes] = React.useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isUserLogged = React.useMemo(
    () => localStorage.getItem("AUTHKEY") ? true : false,
    []
  );


  useEffect(() => {

    if (store) {
      reqSend.defaultReq("POST", 'shop/get-routs', { store_id: store }, responce => {
        setRoutes(responce.data.results)

      });
    }
  }, [store])





  const { bagItems, addToBag, removeFromBag, changeSize, getAvailableSizes } =
    useContext(ShopContext);

  const getTot = () => {
    const sum = bagItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return sum;
  };

  // {console.log(bagItems)}
  return (
    <>
      <Navigation active={4} />
      <Search />

      <h1>Shopping Bag</h1>
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
                        <img
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          // height={100}
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
                        className="max"
                        onChange={(e) => {
                          changeSize(product.id, product.size, e.target.value);
                        }}
                      >
                        {getAvailableSizes(product.id).map((size) => (
                          <option key={size} value={size}>
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
                { }
                <Button
                  fullWidth
                  onPress={onOpen}
                  isDisabled={bagItems.length === 0 || !isUserLogged}
                >
                  Proceed to Checkout
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalBody className="modal-body">
                          <Select
                            label="Store"
                            placeholder="Select the store"
                            isRequired
                            // onValueChange={setStore}
                            onChange={(e) => { setStore(e.target.value) }}
                          >
                            {storeData.map((store) => (
                              <SelectItem key={store[0]} value={store[0]}>
                                {store[1]}
                              </SelectItem>
                            ))}
                          </Select>
                          <Select
                            label="Route"
                            placeholder="Select the route"
                            isRequired
                            onChange={(e) => { setRoute(e.target.value)}}
                          >

                            {routes && routes.map((val, index) => {
                           
                              return (
                                <SelectItem key={val.id} value={val.id}>
                                  {val.name}
                                </SelectItem>
                              )
                            })}
                          </Select>
                        </ModalBody>
                        <Link

                          to={
                            bagItems.length && isUserLogged
                              ? "/paymentgateway"
                              : "/bag"
                          }
                        >
                          <Button className="modal-btn"
                            onClick={() => {console.log(route)
                              if (store && route) {
                                reqSend.defaultReq("POST", 'shop/place-order', {
                                  store_id: store,
                                  route_id: route,
                                  product_id: bagItems[0].id,
                                  quntity: bagItems[0].quantity
                                }, responce => {

                                })
                              }

                            }}
                            isDisabled={
                              bagItems.length === 0 || !isUserLogged
                            }
                            fullWidth
                          >
                            Confim
                          </Button>
                        </Link>
                      </>
                    )}
                  </ModalContent>
                </Modal>
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
