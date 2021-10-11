CREATE TYPE two_id AS (id_before SMALLINT, id_after SMALLINT);


CREATE OR REPLACE FUNCTION insert_reservation(varchar(50), varchar(50), varchar(100),
									   varchar(20), varchar(60), varchar(60),
									   varchar(40), date, date, UUID, UUID, SMALLINT, SMALLINT)
RETURNS UUID AS
$BODY$
DECLARE
	vreserver_name		ALIAS FOR $1;
	vlast_name				ALIAS FOR $2;
	vemail						ALIAS FOR $3;
	vtel							ALIAS FOR $4;
	vcountry					ALIAS FOR $5;
	vcity							ALIAS FOR $6;
	vaddress					ALIAS FOR $7;
	ventrance					ALIAS FOR $8;
	vdeparture				ALIAS FOR $9;
	vroom_uuid				ALIAS FOR $10;
	vplan_uuid				ALIAS FOR $11;
	vadults						ALIAS FOR $12;
	vchildren				  ALIAS FOR $13;
	table_id					SMALLINT;
	table_uuid				UUID;
BEGIN
	INSERT INTO reserver (name, last_name, email, tel, country, city, address)
	VALUES (vreserver_name, vlast_name, vemail, vtel, vcountry, vcity, vaddress)
	ON CONFLICT (email) DO UPDATE
	SET name = excluded.name,
	last_name = excluded.last_name,
	tel = excluded.tel,
	city = excluded.city,
	address = excluded.address;

	INSERT INTO reservation (entrance, departure, room_id, reserver_id, adults, children)
		VALUES (ventrance, vdeparture,
		(SELECT room_id FROM room WHERE room.uuid = vroom_uuid),
		(SELECT reserver_id FROM reserver WHERE email = vemail), vadults, vchildren) RETURNING reservation_id, uuid INTO table_id, table_uuid;

	IF vplan_uuid IS NOT NULL THEN
		INSERT INTO plan_reservation VALUES (
			(SELECT plan_id FROM plan WHERE plan.uuid = vplan_uuid), table_id);
	END IF;
	RETURN table_uuid;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION update_img(varchar(25))
RETURNS two_id AS
$BODY$
DECLARE
	static_img_name		ALIAS FOR $1;
	img								two_id;
BEGIN
	SELECT image_id INTO img.id_before FROM static_image WHERE name = static_img_name;
	INSERT INTO image VALUES (DEFAULT) RETURNING image_id INTO img.id_after;
	UPDATE static_image SET image_id = img.id_after WHERE name = static_img_name;
	DELETE FROM image WHERE image_id = img.id_before;
	RETURN img;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION create_select_room()
RETURNS room AS
$BODY$
DECLARE
	img					SMALLINT;
	new_uuid		UUID;
	new_room		room;
BEGIN
	INSERT INTO image VALUES (DEFAULT) RETURNING image_id INTO img;
	INSERT INTO room (name, description, cost, adults, children, image_id) VALUES ('', '',0, 1, 0, img) RETURNING uuid INTO new_uuid;
	SELECT * INTO new_room FROM room WHERE room.uuid = new_uuid;
	RETURN new_room;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION delete_room(uuid)
RETURNS SMALLINT AS
$BODY$
DECLARE
	room_uuid		ALIAS FOR $1;
	img					SMALLINT;
BEGIN
	SELECT image_id INTO img FROM room WHERE room.uuid = room_uuid;
	DELETE FROM room WHERE room.uuid = room_uuid;
	DELETE FROM image WHERE image_id = img;
	RETURN img;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION update_img_room(uuid)
RETURNS two_id AS
$BODY$
DECLARE
	uuid_room			ALIAS FOR $1;
	img						two_id;
BEGIN
	SELECT image_id INTO img.id_before FROM room WHERE room.uuid = uuid_room;
	INSERT INTO image VALUES (DEFAULT) RETURNING image_id INTO img.id_after;
	UPDATE room SET image_id = img.id_after WHERE room.uuid = uuid_room;
	DELETE FROM image WHERE image_id = img.id_before;
	RETURN img;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION delete_reservation(timestamp)
RETURNS INTEGER AS
$BODY$
DECLARE
	vtimestamp				ALIAS FOR $1;
	vreservation			INTEGER;
	vplan							SMALLINT;
	vreserver					INTEGER;
BEGIN
	SELECT tb1.reservation_id, tb5.plan_id, tb1.reserver_id
	INTO vreservation, vplan, vreserver
	FROM reservation AS tb1
	JOIN reserver AS tb2
	ON tb1.reserver_id = tb2.reserver_id
	LEFT JOIN plan_reservation AS tb4
	ON tb1.reservation_id = tb4.reservation_id
	LEFT JOIN plan AS tb5
	ON tb4.plan_id = tb5.plan_id
	WHERE timestamp = vtimestamp;

	IF vplan IS NOT NULL THEN
		DELETE FROM plan_reservation WHERE plan_id = vplan AND reservation_id = vreservation;
	END IF;
	DELETE FROM reservation WHERE reservation_id = vreservation;
	RETURN vreserver;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION create_select_plan()
RETURNS plan AS
$BODY$
DECLARE
	img					SMALLINT;
	new_uuid		UUID;
	new_plan		plan;
BEGIN
	INSERT INTO image VALUES (DEFAULT) RETURNING image_id INTO img;
	INSERT INTO plan (name, description, image_id) VALUES ('', '', img) RETURNING uuid INTO new_uuid;
	SELECT * INTO new_plan FROM plan WHERE plan.uuid = new_uuid;
	RETURN new_plan;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION update_img_plan(uuid)
RETURNS two_id AS
$BODY$
DECLARE
	uuid_plan			ALIAS FOR $1;
	img						two_id;
BEGIN
	SELECT image_id INTO img.id_before FROM plan WHERE plan.uuid = uuid_plan;
	INSERT INTO image VALUES (DEFAULT) RETURNING image_id INTO img.id_after;
	UPDATE plan SET image_id = img.id_after WHERE plan.uuid = uuid_plan;
	DELETE FROM image WHERE image_id = img.id_before;
	RETURN img;
END
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION delete_plan(uuid)
RETURNS SMALLINT AS
$BODY$
DECLARE
	plan_uuid		ALIAS FOR $1;
	img					SMALLINT;
BEGIN
	SELECT image_id INTO img FROM plan WHERE plan.uuid = plan_uuid;
	DELETE FROM plan WHERE plan.uuid = plan_uuid;
	DELETE FROM image WHERE image_id = img;
	RETURN img;
END
$BODY$
LANGUAGE 'plpgsql';