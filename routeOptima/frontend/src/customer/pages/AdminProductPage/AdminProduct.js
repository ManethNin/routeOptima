import React from "react";
import styles from "./AdminProduct.module.css";

// Components
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import { ProfileModal } from "../../components/ProfileModal/ProfileModal";

// NextUI
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardBody,
  CardFooter,
  Image,
  Avatar,
  Textarea,
} from "@nextui-org/react";

import axios from "axios";


// Navigation Bar Links
const menuItems = [
  { name: "Accounts", to: "/admin/accounts" },
  { name: "Reports", to: "/admin/reports" },
  { name: "Products", to: "/admin/products" },
];

const current = 2;


// Return Component
export const AdminProduct = () => {
  
  // Get products from db
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

  React.useEffect(() => {
    getProducts();
  }, []);

  // Handle Update
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKey, setSelectedKey] = React.useState(new Set(["0"]));

  const handleSelect = () => {
    setProductName(productList[parseInt([...selectedKey][0])].product_name);
    setVolume(productList[parseInt([...selectedKey][0])].volume);
    setPrice(productList[parseInt([...selectedKey][0])].price);
    setCover(productList[parseInt([...selectedKey][0])].cover);
    setProduct_id(productList[parseInt([...selectedKey][0])].product_id);
    setDescription(productList[parseInt([...selectedKey][0])].description);
    onOpen();
  };

  const [productName, setProductName] = React.useState();
  const [voulume, setVolume] = React.useState();
  const [price, setPrice] = React.useState();
  const [cover, setCover] = React.useState();
  const [product_id, setProduct_id] = React.useState();
  const [description, setDescription] = React.useState();

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("volume", voulume);
    formData.append("price", price);
    formData.append("cover", cover);
    formData.append("product_id", product_id);
    formData.append("description", description);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/admin/products`,
        formData
      );

      if (response.status === 200) {
        alert("Product updated successfully");
        window.location.reload();
      } else {
        alert("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product: " + error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/admin/products/` + product_id
      );

      if (response.status === 200) {
        alert("Product removed successfully");
        window.location.reload();
      } else {
        alert("Error removing product");
      }
    } catch (error) {
      console.error("Error removing product: " + error);
    }
  };

  // Handle Add
  const handleAdd = () => {
    if (!coverAdd) {
      alert("Please select a cover image.");
      return;
    }
    const formData = new FormData();
    formData.append("product_name", productNameAdd);
    formData.append("volume", voulumeAdd);
    formData.append("price", priceAdd);
    formData.append("cover", coverAdd);
    formData.append("description", descriptionAdd);
    axios
      .post("http://localhost:3001/api/admin/products", formData)
      .then((res) => {
        if (res.status === 201) {
          alert("Product added successfully");
          window.location.reload();
        } else {
          alert("Error adding product");
          window.location.reload();
        }
      });
  };

  const [productNameAdd, setProductNameAdd] = React.useState();
  const [voulumeAdd, setVolumeAdd] = React.useState();
  const [priceAdd, setPriceAdd] = React.useState();
  const [coverAdd, setCoverAdd] = React.useState();
  const [descriptionAdd, setDescriptionAdd] = React.useState();

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  // Return
  return (
    <>
    {/* Navigation Bar */}
      <NavigationBar
        menuItems={menuItems}
        current={current}
        profile={<ProfileModal />}
      />

      {/* Add Modal */}
      <div className={styles["add-btn-container"]}>
        <Button onPress={onOpenAdd} size="sm" fullWidth>
          Add Product
        </Button>
      </div>
      <Modal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1">
                Add Product
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex items-center flex-col gap-2"
                  id="add-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAdd();
                  }}
                  enctype="multipart/form-data"
                >
                  <Input
                    type="text"
                    label="Product Name"
                    onValueChange={setProductNameAdd}
                    value={productNameAdd}
                    placeholder="Enter product name"
                    isRequired
                  />
                  <Input
                    type="number"
                    label="Volume"
                    onValueChange={setVolumeAdd}
                    value={voulumeAdd}
                    placeholder="Enter product volume"
                    isRequired
                  />
                  <Input
                    type="number"
                    label="Price (LKR)"
                    onValueChange={setPriceAdd}
                    value={priceAdd}
                    placeholder="Enter product price"
                    isRequired
                  />
                  <Input
                    type="file"
                    label="Cover"
                    onChange={(e) => setCoverAdd(e.target.files[0])}
                    placeholder="Upload cover image"
                    isRequired
                  />
                  <Textarea
                    labelPlacement="inside"
                    label="Description"
                    placeholder="Enter your description"
                    fullWidth
                    onValueChange={setDescriptionAdd}
                    value={descriptionAdd}
                    isRequired
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" fullWidth type="submit" form="add-form">
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Product Table */}
      <div className={styles["products-container"]}>
        <Table
          aria-label="Example static collection table"
          selectionMode="single"
          selectionBehavior="replace"
          selectedKeys={selectedKey}
          onSelectionChange={setSelectedKey}
          onRowAction={(key) => handleSelect(key)}
          isStriped
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>VOLUME (grams)</TableColumn>
            <TableColumn>PRICE (LKR)</TableColumn>
            <TableColumn>COVER</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {productList.map((product, index) => (
              <TableRow
                key={index}
                onClick={() => setSelectedKey(new Set([index.toString()]))}
              >
                <TableCell>{product.product_id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{parseFloat(product.volume).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(product.price).toFixed(2)}</TableCell>
                <TableCell>
                  <Avatar
                    src={`http://localhost:3001/images/${product.cover}`}
                    radius="sm"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Update Modal */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center flex-col gap-1">
                  Update Product
                </ModalHeader>
                <ModalBody>
                  <div className="flex items-center flex-col gap-1">
                    <Card
                      shadow="sm"
                      fullWidth
                      onPress={() => console.log("item pressed")}
                    >
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={cover}
                          className="w-full object-cover h-[140px]"
                          src={`http://localhost:3001/images/${cover}`}
                        />
                      </CardBody>
                      <CardFooter className="text-small flex items-center flex-col gap-1">
                        <Input
                          type="number"
                          label="Product ID"
                          isDisabled={true}
                          onValueChange={setProduct_id}
                          value={product_id}
                        />
                        <Input
                          type="text"
                          label="Product Name"
                          onValueChange={setProductName}
                          value={productName}
                        />
                        <Input
                          type="number"
                          label="Volume"
                          onValueChange={setVolume}
                          value={voulume}
                        />
                        <Input
                          type="number"
                          label="Price (LKR)"
                          onValueChange={setPrice}
                          value={price}
                        />
                        <Input
                          type="file"
                          label="Cover"
                          onChange={(e) => setCover(e.target.files[0])}
                          placeholder="Upload cover image"
                        />
                        <Textarea
                          labelPlacement="inside"
                          label="Description"
                          placeholder="Enter your description"
                          fullWidth
                          onValueChange={setDescription}
                          value={description}
                        />
                      </CardFooter>
                    </Card>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    fullWidth
                    onPress={() => handleDelete()}
                  >
                    Remove
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleUpdate()}
                    fullWidth
                  >
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
