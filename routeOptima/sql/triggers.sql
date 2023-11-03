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



-- set dilivered after adding to dilivery 
DELIMITER //
CREATE TRIGGER update_order_product_delevered
AFTER INSERT ON truck_delivery
FOR EACH ROW
BEGIN
  UPDATE order_product
  SET delevered = 1
  WHERE id = NEW.order_product_id;
END;
//
DELIMITER ;




-- update driver and assitant work hours
DELIMITER //
CREATE TRIGGER `update_driver_assitant_work_hours` BEFORE INSERT ON `truck_schedule`
 FOR EACH ROW BEGIN
  SET @max_time = 0.0;
  
  SELECT TIME_TO_SEC(max_time) / 3600.0 INTO @max_time FROM route WHERE id = NEW.route_id;

  SET @driver_exists = 0;
  SELECT COUNT(*) INTO @driver_exists FROM driver WHERE user_id = NEW.driver_user_id;

  SET @assi_exists = 0;
  SELECT COUNT(*) INTO @assi_exists FROM assistant WHERE user_id = NEW.assistant_user_id;
  
  IF @driver_exists = 0 THEN
    INSERT INTO driver (user_id, work_hours) VALUES (NEW.driver_user_id, 0);
  END IF;

  IF @assi_exists = 0 THEN
    INSERT INTO assistant (user_id, work_hours) VALUES (NEW.assistant_user_id, 0);
  END IF;

  -- Increment the work_hours in the driver table for the specified user_id
  UPDATE driver
  SET work_hours =work_hours+ @max_time
  WHERE user_id = NEW.driver_user_id;

   UPDATE assistant
  SET work_hours =work_hours+ @max_time
  WHERE user_id = NEW.assistant_user_id;
END
//
DELIMITER ;





DELIMITER //

CREATE TRIGGER `delete_driver_assistant_work_hours` BEFORE DELETE ON `truck_schedule`
FOR EACH ROW
BEGIN
  SET @max_time = 0.0;

  SELECT TIME_TO_SEC(max_time) / 3600.0 INTO @max_time FROM route WHERE id = OLD.route_id;

  UPDATE driver
  SET work_hours = work_hours - @max_time
  WHERE user_id = OLD.driver_user_id;

  UPDATE assistant
  SET work_hours = work_hours - @max_time
  WHERE user_id = OLD.assistant_user_id;
END;
//
DELIMITER ;















-- events 

CREATE EVENT reset_work_hours_event ON SCHEDULE EVERY 1 WEEK STARTS TIMESTAMP(CURRENT_DATE, '23:59:00') DO UPDATE driver SET work_hours = 0;
CREATE EVENT reset_work_hours_assi_event ON SCHEDULE EVERY 1 WEEK STARTS TIMESTAMP(CURRENT_DATE, '23:59:00') DO UPDATE assistant SET work_hours = 0;

-- DELIMITER //
-- CREATE EVENT reset_work_hours_event
-- ON SCHEDULE EVERY 30 SECOND
-- DO
-- BEGIN
--   UPDATE driver
--   SET work_hours = 0;
-- END;
-- //
-- DELIMITER ;

