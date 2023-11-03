import React from "react";
import styles from "./ProductPage.module.css";

// Components
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";

// NextUI
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Textarea
} from "@nextui-org/react";
import axios from "axios";

// Navigation Bar Links
const menuItems = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "Cart", to: "/cart" },
  { name: "Contact", to: "/contact" },
];

const current = 1;

export const ProductPage = () => {
  // Get Products
  const [productList, setProductList] = React.useState([]);

  const getProducts = () => {
    axios
      .get("http://localhost:3001/api/admin/products")
      .then((res) => {
        setProductList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("AxiosError:", error);
      });
  };

  getProducts();

  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = React.useState();

  // Return
  return (
    <>
      {/* Navigation Bar */}
      <NavigationBar menuItems={menuItems} current={current} />

      {/* Products */}
      <div className={styles["product-container"]}>
        {productList.map((product, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            // onPress={onOpen}
            onClick={() => {
              setSelectedProduct(product);
              onOpen();
            }}
          >
            <CardBody className="overflow-visible p-0">
              <img
                shadow="sm"
                radius="lg"
                width="100%"
                isZoomed
                alt={product.cover}
                className="w-full object-cover h-[140px]"
                src={`http://localhost:3001/images/${product.cover}`}
              />
            </CardBody>
            <CardFooter className="text-small justify-between text-left">
              <b className="mr-20">{product.product_name}</b>
              <p className="text-right text-default-500">LKR {parseInt(product.price).toFixed(2)} </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className={styles["modal-body"]}>
                  <div className={styles["modal-body-left"]}>
                    <Image
                      width={300}
                      alt="NextUI hero Image"
                      src={`http://localhost:3001/images/${selectedProduct.cover}`}
                    />
                  </div>
                  <div className={styles["modal-body-right"]}>
                    <h2>{selectedProduct.product_name}</h2>
                    <p>weight - {selectedProduct.volume} g</p>
                    <Textarea
                      isReadOnly
                      label="Description"
                      labelPlacement="inside"
                      placeholder="Enter your description"
                      defaultValue={selectedProduct.description}
                      className="max-w"
                      fullWidth
                      minRows={4}
                      maxRows={4}
                    />
                    <p className={styles["price"]}>Price - LKR {parseInt(selectedProduct.price).toFixed(2)}</p>
                    <Button color="primary" fullWidth>Add to Bag</Button>
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter></ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
