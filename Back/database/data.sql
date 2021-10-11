INSERT INTO hotel VALUES (true, 'Sobre nosotros', 'Misión', 'Visión', 'Historia', 'Cel. +57 3176819481', 'Alta');

INSERT INTO image VALUES (DEFAULT);
INSERT INTO image VALUES (DEFAULT);
INSERT INTO image VALUES (DEFAULT);
INSERT INTO image VALUES (DEFAULT);
INSERT INTO image VALUES (DEFAULT);
INSERT INTO image VALUES (DEFAULT);
INSERT INTO image VALUES (DEFAULT);

INSERT INTO static_image VALUES ('slide 1', 2);
INSERT INTO static_image VALUES ('slide 2', 3);
INSERT INTO static_image VALUES ('slide 3', 4);
INSERT INTO static_image VALUES ('about_us_img1', 5);
INSERT INTO static_image VALUES ('about_us_img2', 6);
INSERT INTO static_image VALUES ('about_us_cover', 7);

-- INSERT INTO plan (name, image_id, description) VALUES ('Plan extreme', 8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum tristique elit, at consequat eros volutpat nec. Nunc quis augue at ipsum blandit dignissim.

-- Vestibulum vestibulum egestas commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac varius nunc. Curabitur vitae rhoncus dolor. Sed ac molestie lacus.');
-- INSERT INTO plan (name, image_id, description) VALUES ('Plan romance', 9, 'Vestibulum vestibulum egestas commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac varius nunc. Curabitur vitae rhoncus dolor. Sed ac molestie lacus.

-- Proin vel lacinia elit, vitae pulvinar ante. Praesent sollicitudin urna eget massa placerat, sit amet ornare nisl malesuada. Suspendisse vestibulum vitae est a porttitor. Praesent sed odio urna.');
-- INSERT INTO plan (name, image_id, description) VALUES ('Plan 3', 10, 'Vestibulum vestibulum egestas commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac varius nunc. Curabitur vitae rhoncus dolor. Sed ac molestie lacus..');
-- INSERT INTO plan (name, image_id, description) VALUES ('Plan 4', 11, 'Vestibulum vestibulum egestas commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaespendisse vestibulum vitae est a porttitor. Praesent sed odio urna.');
-- INSERT INTO plan (name, image_id, description) VALUES ('Plan 5', 12, 'Vestibulum vestibulum egestas commodo. Class aptent taciti soc.');


-- INSERT INTO room (name, description, cost, adults, children, image_id) VALUES ('301', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum tristique elit, at consequat eros volutpat nec. Nunc quis augue at ipsum blandit dignissi.',
-- 20000, 2, 3, 13);
-- INSERT INTO room (name, description, cost, adults, children, image_id) VALUES ('302', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum tristique elit.',
-- 20000, 3, 2, 14);
-- INSERT INTO room (name, description, cost, adults, children, image_id) VALUES ('303', 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac varius nunc. Curabitur vitae rhoncus dolor. Sed ac molestie lacus.',
-- 20000, 2, 1, 15);
-- INSERT INTO room (name, description, cost, adults, children, image_id) VALUES ('304', 'Praesent sollicitudin urna eget massa placerat, sit amet ornare nisl malesuada. Suspendisse vestibulum vitae est a porttitor. Praesent sed odio urna.',
-- 20000, 4, 0, 16);
-- INSERT INTO room (name, description, cost, adults, children, image_id) VALUES ('305', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum tristique elit, at consequat eros volutpat nec..',
-- 20000, 2, 2, 17);
-- INSERT INTO room (name, description, cost, adults, children, image_id) VALUES ('306', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum tristique elit, at consequat eros volutpat nec.',
-- 20000, 5, 3, 18);


-- INSERT INTO reserver (name, last_name, email, tel, country, city, address) VALUES ('Juanito', 'Gonzales', 'Juanito777@gmail.com', '366111666', 'Colombia', 'Cali', 'Cra 66 # 10 - 50');
-- INSERT INTO reserver (name, last_name, email, tel, country, city, address) VALUES ('Patricio', 'Estrella', 'Patricio777@gmail.com', '366222666', 'Colombia', 'Fondo de Bikini', 'Cra 69 # 11 - 22');


-- INSERT INTO reservation (timestamp, entrance, departure, room_id, reserver_id, adults, children) VALUES ('2021-09-14 07:01:01.100000', '2021/09/15', '2021/09/18', 1, 1, 1, 0);
-- INSERT INTO reservation (timestamp, entrance, departure, room_id, reserver_id, adults, children) VALUES ('2021-09-14 07:02:01.100000', '2021/09/20', '2021/09/22', 2, 2, 1, 0);


-- INSERT INTO receipt (reservation_id, timestamp, reference, description, amount, currency, method) VALUES (1, '2021-09-14 07:01:01.100000', 'aaaaaaaaaabc1', 'Sit amet ornare nisl malesuada. Suspendisse vestibulum vitae est a porttitor. Praesent sed odio urna.', 80000, 'Pesos Colombianos', 'PSE');
-- INSERT INTO receipt (reservation_id, timestamp, reference, description, amount, currency, method) VALUES (2, '2021-09-14 07:02:01.100000', 'aaaaaaaaaabc2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum tristique elit.', 70000, 'Pesos Colombianos', 'PSE');


-- INSERT INTO plan_reservation VALUES (1, 1);