-- update  processed to 1  in order_product when order added to train

DELIMITER $$

CREATE TRIGGER update_processed_value
AFTER INSERT ON train_trip
FOR EACH ROW
BEGIN
    UPDATE order_product
    SET processed = 1
    WHERE id = NEW.order_product_id;
END;
$$

DELIMITER ;



-- mark train trip as completed 

DELIMITER //
CREATE TRIGGER update_shipped
AFTER UPDATE ON train_trip
FOR EACH ROW
BEGIN
  IF NEW.completed_status = 1 THEN
    UPDATE order_product
    SET shipped = 1
    WHERE NEW.order_product_id = order_product.id;
  END IF;
END;
//
DELIMITER ;





