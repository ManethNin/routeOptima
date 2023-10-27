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
