import React from "react";
import styles from "./ProfileModal.module.css";

import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Account } from "../Account/Account";

export const ProfileModal = (props) => {

  return (
    <div className={styles["container"]}>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Avatar
            src={props.src}
            className="w-6 h-6 text-tiny"
            isBordered
            color="primary"
            showFallback
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className={styles["pop-over-container"]}>
            <Account />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
