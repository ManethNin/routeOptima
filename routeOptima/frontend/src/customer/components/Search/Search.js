import React, { useContext } from "react";
import "./Search.css";
import {
  Input,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  Textarea,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { FiSearch } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5"
import { ShopContext } from "../../context/shopContextProvider";

import { model_list } from "../../data/data";

export const Search = () => {
  const [value, setValue] = React.useState("");
  const { search, addToBag, getAvailableSizes } = useContext(ShopContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedItem, setselectedItem] = React.useState(model_list[0]);
  const [selectedSize, setSelectedSize] = React.useState(7);

  const handleOpen = (item) => {
    setselectedItem(item);
    onOpen();
  };

  const handleSearch = (e) => {
    setValue(e);
  };

  const onsearch = (searchItemId) => {
    search(searchItemId);
  };

  return (
    <div className="search-bar">
      <Input
        type="text"
        placeholder="Search your product here"
        labelPlacement="outside"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        startContent={
          <FiSearch
            onClick={() => onsearch(value)}
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
          />
        }
        endContent={
          value !== "" ?
          <IoCloseCircleOutline className="close-icon" onClick={(e) => handleSearch("")}/>
          : <p></p>
        }
      />
      
      <div className="dropdown">
        {model_list
          .filter((item) => {
            const searchItem = value.toLowerCase();
            const product_name = item.title.toLowerCase();
            return (
              searchItem && product_name.startsWith(searchItem) && searchItem
            );
          })
          .map((item, index) => (
            <div
              key={index}
              className="dropdown-row"
              onClick={() => handleOpen(item)}
            >
              <img width={100} height={100} alt={item.title} src={item.img} />
              <div key={index} className="title">
                {item.title}
              </div>
            </div>
          ))}
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
                        alt={selectedItem.title}
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
                            <div className="size-text">Size(UK) :</div>
                            <select
                              defaultValue={7}
                              className="max-w-xs"
                              onChange={(e) => {
                                setSelectedSize(e.target.value);
                              }}
                            >
                              {getAvailableSizes(selectedItem.id).map(
                                (size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>

                        <Button
                          // isDisabled={
                          //   getAvailableSizes(selectedItem.id).length === 0
                          // }
                          onClick={() => {
                            addToBag(
                              selectedItem.id,
                              selectedItem.title,
                              selectedItem.img,
                              selectedSize,
                              selectedItem.color,
                              selectedItem.description,
                              selectedItem.brand,
                              selectedItem.price,
                              selectedItem.gender
                            );
                            onClose();
                          }}
                          fullWidth
                        >
                          Add to Bag
                          {/* {getAvailableSizes(selectedItem.id).length === 0
                            ? "Out of Stock"
                            : "Add to Bag"} */}
                        </Button>
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
