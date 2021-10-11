CREATE EXTENSION "pgcrypto";

CREATE TABLE hotel
(
    hotel_id BOOLEAN NOT NULL,
    about_us VARCHAR(3000) NOT NULL,
    mission VARCHAR(3000) NOT NULL,
    vision VARCHAR(3000) NOT NULL,
    history VARCHAR(4000) NOT NULL,
    contact VARCHAR(60) NOT NULL,
    season VARCHAR(15) NOT NULL,
    PRIMARY KEY (hotel_id)
);

CREATE TABLE reserver
(
    reserver_id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tel VARCHAR(20) NOT NULL,
    country VARCHAR(60) NOT NULL,
    city VARCHAR(60) NOT NULL,
    UNIQUE (email),
    address VARCHAR(40) NOT NULL,
    PRIMARY KEY (reserver_id)
);

CREATE TABLE image
(
    image_id SMALLSERIAL NOT NULL,
    PRIMARY KEY (image_id)
);

CREATE TABLE static_image
(
    name VARCHAR(25) NOT NULL,
    image_id SMALLINT NOT NULL,
    PRIMARY KEY (name),
    UNIQUE (image_id),
    FOREIGN KEY (image_id) REFERENCES image(image_id)
          ON UPDATE CASCADE
);

CREATE TABLE plan
(
    plan_id SMALLSERIAL NOT NULL,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(60) NOT NULL,
    image_id SMALLINT NOT NULL,
    description VARCHAR(3000) NOT NULL,
    PRIMARY KEY (plan_id),
    UNIQUE (uuid),
    UNIQUE (image_id),
    FOREIGN KEY (image_id) REFERENCES image(image_id)
          ON UPDATE CASCADE
);

CREATE TABLE room
(
    room_id SMALLSERIAL NOT NULL,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(10) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    cost INT NOT NULL,
    adults SMALLINT NOT NULL,
    children SMALLINT NOT NULL,
    image_id SMALLINT NOT NULL,
    UNIQUE (uuid),
    UNIQUE (image_id),
    PRIMARY KEY (room_id),
    FOREIGN KEY (image_id) REFERENCES image(image_id)
          ON UPDATE CASCADE
);

CREATE TABLE reservation
(
    reservation_id SERIAL NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE '05'),
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    entrance DATE NOT NULL,
    departure DATE NOT NULL,
    room_id SMALLINT NOT NULL,
    reserver_id INT NOT NULL,
    adults SMALLINT NOT NULL,
    children SMALLINT NOT NULL,
    cancellation BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (reservation_id),
    UNIQUE (timestamp),
    FOREIGN KEY (room_id) REFERENCES room(room_id)
          ON UPDATE CASCADE,
    FOREIGN KEY (reserver_id) REFERENCES reserver(reserver_id)
          ON UPDATE CASCADE
);

CREATE TABLE plan_reservation
(
    plan_id SMALLINT NOT NULL,
    reservation_id INT NOT NULL,
    PRIMARY KEY (plan_id, reservation_id),
    FOREIGN KEY (plan_id) REFERENCES plan(plan_id)
          ON UPDATE CASCADE,
    FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id)
          ON UPDATE CASCADE
);

-- CREATE TABLE receipt
-- (
--     receipt_id SERIAL NOT NULL,
--     reservation_id INT NOT NULL,
--     timestamp TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE '05'),
--     reference VARCHAR(50) NOT NULL,
--     description VARCHAR(500) NOT NULL,
--     amount INT NOT NULL,
--     currency VARCHAR(20) NOT NULL,
--     method VARCHAR(20) NOT NULL,
--     PRIMARY KEY (receipt_id),
--     UNIQUE (reservation_id),
--     UNIQUE (timestamp),
--     UNIQUE (reference),
--     FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id)
--           ON UPDATE CASCADE
-- );