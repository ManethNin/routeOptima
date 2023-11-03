import React, { useContext,useEffect,useState } from "react";
import "./Shop.css";
import * as reqSend from '../../data/reqSender'

import { ShopContext } from "../../context/shopContextProvider";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

import { Search } from "../../components/Search/Search";
import { model_list, colors, brands } from "../../data/data";
import { Navigation } from "../../components/Navigation/Navigation";
import { TbPackageOff } from "react-icons/tb"

export const Shop = () => {

  const [filterList, setFilterList] = React.useState([]);
  const [data, setData] = React.useState([]);


  
  useEffect(() => {
  
    reqSend.defaultReq("GET", 'shop/get-all-products',{} ,responce => {
      setFilterList(responce.data.results.sort((a, b) => a.title.localeCompare(b.title)))
      setData(responce.data.results)
    });
  }, [])

 

  const [selectedGender, setSelectedGender] = React.useState("all");
  const [selectedColor, setSelectedColor] = React.useState("all");
  const [selectedBrand, setSelectedBrand] = React.useState("all");
  const [sortByMethod, setSortByMethod] = React.useState("name");
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [selectedSize, setSelectedSize] = React.useState(7);

  const { addToBag, getAvailableSizes } =
    useContext(ShopContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setselectedItem] = React.useState({});

  const handleOpen = (item) => {
    setselectedItem(item);
    onOpen();
  };

  const handleScreenWidthChange = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleSortBy = (sortBy, current_list) => {
    const sortedItems = [...current_list];
    if (sortBy === "lowhigh") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highlow") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else {
      sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    }
    setSortByMethod(sortBy);
    setFilterList(sortedItems);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleScreenWidthChange);
    return () => {
      window.removeEventListener("resize", handleScreenWidthChange);
    };
  }, []);

  const handleBrandCategory = (brand) => {
    setSelectedBrand(brand);
    const filteredItems = data.filter(
      (item) =>
        (item.brand === brand || brand === "all") &&
        (selectedColor === "all" || item.color === selectedColor) &&
        (selectedGender === "all" || item.gender === selectedGender)
    );
    handleSortBy(sortByMethod, filteredItems);
  };

  const handleGenderCategory = (gender) => {
    setSelectedGender(gender);
    const filteredItems = data.filter(
      (item) =>
        (item.gender === gender || gender === "all") &&
        (selectedColor === "all" ? true : item.color === selectedColor) &&
        (selectedBrand === "all" ? true : item.brand === selectedBrand)
    );
    handleSortBy(sortByMethod, filteredItems);
  };

  const handleColorCategory = (color) => {
    setSelectedColor(color);
    const filteredItems = data.filter(
      (item) =>
        (item.color === color || color === "all") &&
        (selectedGender === "all" ? true : item.gender === selectedGender) &&
        (selectedBrand === "all" ? true : item.brand === selectedBrand)
    );
    handleSortBy(sortByMethod, filteredItems);
  };


  return (
    <>
      <Navigation active={1}/>
      <Search />

      <h1>Products</h1>

      <div className="shop-by">
        <p>Shop by Category</p>
        <div className="select-sort-by">
          <Select
            labelPlacement="outside-left"
            label="Sort by: "
            defaultSelectedKeys={["name"]}
            onChange={(e) => handleSortBy(e.target.value, filterList)}
            className="max-w"
            selectionMode="single"
          >
            <SelectItem key={"name"}>Name</SelectItem>
            <SelectItem key={"highlow"}>Price high to low</SelectItem>
            <SelectItem key={"lowhigh"}>Price low to high</SelectItem>
          </Select>
        </div>
      </div>

      <div className="product-section">
        <div className="filter-section">
          <div className="gender-filter">
            <RadioGroup
              label="Gender"
              defaultValue="all"
              orientation={screenWidth < 900 ? "horizontal" : "vertical"}
              onChange={(e) => handleGenderCategory(e.target.value)}
            >
              <Radio value="all">All</Radio>
              <Radio value="men">Men</Radio>
              <Radio value="women">Women</Radio>
            </RadioGroup>
          </div>

          <div className="color-filter">
            <RadioGroup
              label="Color"
              defaultValue="all"
              orientation={screenWidth < 900 ? "horizontal" : "vertical"}
              onChange={(e) => handleColorCategory(e.target.value)}
            >
              <Radio value="all">All</Radio>
              {colors.map((color_name, index) => <Radio key={index} value={color_name}>{color_name.charAt(0).toUpperCase() + color_name.slice(1)}</Radio>)}
            </RadioGroup>
          </div>

          <div className="brand-filter">
            <RadioGroup
              label="Brand"
              defaultValue="all"
              orientation={screenWidth < 900 ? "horizontal" : "vertical"}
              onChange={(e) => handleBrandCategory(e.target.value)}
            >
              <Radio value="all">All</Radio>
              {brands.map((brand_name, index) => <Radio key={index} value={brand_name}>{brand_name.charAt(0).toUpperCase() + brand_name.slice(1)}</Radio>)}
            </RadioGroup>
          </div>
        </div>

        {filterList.length !== 0 ? (
          <div className="product-list">
            {filterList.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => handleOpen(item)}
                isFooterBlurred
              >
                <CardBody className="overflow-visible p-0">
                  <img
            
                    isZoomed
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px] opacityincrease"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small">
                  <div className="card-footer">
                    <p className="card-title">{item.title}</p>
                    <b className="card-price">
                      {item.price.toLocaleString("en-US")}
                    </b>
                    <p className="card-gender">
                      {item.gender.charAt(0).toUpperCase() +
                        item.gender.slice(1)}{" "}
                      |{" "}
                      {item.brand.charAt(0).toUpperCase() + item.brand.slice(1)}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="no-item">
            <TbPackageOff className="no-item-icon"/>
            <p>No items available in the selected category.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="modal-body">
                  <div className="modal-img">
                    <img
                      width={300}
                      height={200}
                      alt={selectedItem.t}
                      src={selectedItem.img}
                    />
                  </div>
                  <div className="product-content">
                    <div className="product-content-1">
                      <p className="text-medium uppercase font-bold">
                        {selectedItem.title}
                      </p>
                      <small className="text-default-500">
                        {selectedItem.gender.charAt(0).toUpperCase() +
                          selectedItem.gender.slice(1)}{" "}
                        |{" "}
                        {selectedItem.brand.charAt(0).toUpperCase() +
                          selectedItem.brand.slice(1)}
                      </small>
                      <Textarea
                        isReadOnly
                        label="Description"
                        labelPlacement="inside"
                        defaultValue={selectedItem.description}
                        className="max-w"
                        fullWidth
                        maxRows={5}
                      />
                    </div>
                    <div className="product-content-1">
                      <div className="size-modal">
                        <h4 className="font-bold text-large">
                          SLRs {selectedItem.price.toLocaleString("en-US")}
                        </h4>
                        <div className="size-select">
                          <div className="size-text">
                            Size(UK) : 
                          </div>
                          <select
                          defaultValue={7}
                            className="max-w-xs"
                            onChange={(e) => {
                              setSelectedSize(e.target.value);
                            }}
                          >
                            {getAvailableSizes(selectedItem.id).map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <Button
                        // isDisabled={getAvailableSizes(selectedItem.id).length === 0}
                        onClick={() => {addToBag(selectedItem.id, selectedItem.title, selectedItem.img, selectedSize, selectedItem.color, selectedItem.description, selectedItem.brand, selectedItem.price, selectedItem.gender); onClose()}}
                        fullWidth
                      >
                        Add to Bag
                        {/* {getAvailableSizes(selectedItem.id).length === 0 ? "Out of Stock" : "Add to Bag"} */}
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
