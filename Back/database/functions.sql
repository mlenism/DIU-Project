CREATE OR REPLACE FUNCTION insert_plan(varchar(50), varchar(50), varchar(100),
									   varchar(20), varchar(60), varchar(60),
									   varchar(40), date, date, varchar(10), 
									   varchar(50))
RETURNS void AS
$BODY$
DECLARE
	vreserver_name		ALIAS FOR $1;
	vlast_name			ALIAS FOR $2;
	vemail				ALIAS FOR $3;
	vtel				ALIAS FOR $4;
	vcountry			ALIAS FOR $5;
	vcity				ALIAS FOR $6;
	vaddress			ALIAS FOR $7;
	ventrance			ALIAS FOR $8;
	vdeparture			ALIAS FOR $9;
	vroom_name			ALIAS FOR $10;
	vplan_name			ALIAS FOR $11;
	table_id			INTEGER;
BEGIN

		INSERT INTO reserver (name, last_name, email, tel, country, city, address)
		VALUES (vreserver_name, vlast_name, vemail, vtel, vcountry, vcity, vaddress)
		ON CONFLICT (email) DO UPDATE
		SET name = excluded.name,
		last_name = excluded.last_name,
		tel = excluded.tel,
		city = excluded.city,
		address = excluded.address;

		INSERT INTO reservation (entrance, departure, room_id, reserver_id)
			VALUES (ventrance, vdeparture, 
			(SELECT room_id FROM room WHERE name = vroom_name),
			(SELECT reserver_id FROM reserver WHERE email = vemail)) RETURNING reservation_id INTO table_id;

		IF vplan_name <> null THEN
			INSERT INTO plan_reservation VALUES (
				(SELECT plan_id FROM plan WHERE name = vplan_name), table_id);
		END IF;
END
$BODY$
LANGUAGE 'plpgsql';