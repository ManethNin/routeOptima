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
CREATE TRIGGER update_train_trip_completed_status
AFTER UPDATE ON order_product
FOR EACH ROW
BEGIN
  IF NEW.shipped = 1 THEN
    UPDATE train_trip
    SET completed_status = 1
    WHERE train_trip.order_product_id = NEW.id;
  END IF;
END;
//
DELIMITER ;

