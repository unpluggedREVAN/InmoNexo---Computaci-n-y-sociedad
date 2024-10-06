--Creación de todas las tablas
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(70) NOT NULL,
    rol SMALLINT NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Propiedades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio DECIMAL(19,4) NOT NULL,
    estado SMALLINT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    capacidad SMALLINT NOT NULL,
    usuarioId SMALLINT NOT NULL,
    inRed SMALLINT NOT NULL DEFAULT 0,
    getAgent SMALLINT NOT NULL DEFAULT 0,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id)
    ON DELETE CASCADE
);

ALTER TABLE Propiedades
ADD COLUMN inRed SMALLINT NOT NULL,
ADD COLUMN getAgent SMALLINT NOT NULL
DELETE ON CASCADE;

CREATE TABLE Intereses (
    id SERIAL PRIMARY KEY,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo SMALLINT NOT NULL,
    propiedadId SMALLINT NOT NULL,
    usuarioId SMALLINT NOT NULL,
    FOREIGN KEY (propiedadId) REFERENCES Propiedades(id),
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id)
);


CREATE TABLE Clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    origen VARCHAR(50) NOT NULL,
    tipo SMALLINT NOT NULL,
    usuarioId SMALLINT NOT NULL,
    propiedadId SMALLINT NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id)
    ON DELETE CASCADE,
    FOREIGN KEY (propiedadId) REFERENCES Propiedades(id)
    ON DELETE CASCADE
);

CREATE TABLE Pagos (
    id SERIAL PRIMARY KEY,
    detalles VARCHAR(50) NOT NULL,
    monto DECIMAL(19, 4) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    propiedadId SMALLINT NOT NULL,
    usuarioid SMALLINT NOT NULL,
    FOREIGN KEY (propiedadId) REFERENCES Propiedades(id)
    ON DELETE CASCADE,
    FOREIGN KEY (usuarioid) REFERENCES Usuarios(id)
    ON DELETE CASCADE
);

CREATE TABLE Eventos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    fechaPublicacion DATE DEFAULT CURRENT_TIMESTAMP,
    estado SMALLINT NOT NULL,
    usuarioId SMALLINT NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id)
    ON DELETE CASCADE
);

--Usuarios de Pruebas
INSERT INTO Usuarios (nombre, correo, contrasena, rol)
VALUES ('Dario Espinoza Aguilar', 'darioespinoza477@gmail.com', '12345678', 0),
('Jose Pablo Mora', 'pablo@gmail.com', '87654321', 1);

--Propiedades de prueba
INSERT INTO Propiedades (nombre, direccion, tipo, precio, estado, descripcion, capacidad, usuarioId)
VALUES ('Casa moderna', 'Girando a la derecha al fondo', 'Alquiler', 12000, 1, 'Casa futurista', 12, 5),
('Casa de playa', 'Playa Samara', 'Venta', 200000, 1, 'Casa de Playa', 6, 5),
('Apartamentos de lujo', 'Escazu', 'Alquiler', 1000, 1, 'Apartamentos con muchos beneficios', 3, 5),
('Apartamento para 2 personas', 'El Guarco, Cartago', 'Alquiler', 3000, 1, 'Apartamento comodo', 2, 2),
('Residencias estudiantiles', 'Occidental, Cartago', 'Compra', 200, 1, 'Residencias para estudiantes', 2, 2);

--Clientes de prueba
INSERT INTO Clientes (nombre, correo, origen, tipo, usuarioId, propiedadId, descripcion)
VALUES ('Usuario Prueba', 'Prueba1@gmail.com', 'Facebook', 0, 5, 2, 'Interesado'),
('Usuario Prueba 2', 'Prueba2@gmail.com', 'Facebook', 0, 5, 1, 'Interesado'),
('Usuario Prueba 3', 'Prueba3@gmail.com', 'Facebook', 1, 5, 4, 'Interesado');


--Clientes de prueba
INSERT INTO Clientes (nombre, correo, origen, tipo, usuarioId)
VALUES ('Usuario ', 'usuario1@gmail.com', 'Facebook', 0, 3),
('Usuario  2', 'usuario2@gmail.com', 'Facebook', 0, 3),
('Usuario  3', 'usuario3@gmail.com', 'Facebook', 1, 3);

--Eventos de prueba
INSERT INTO Eventos (nombre, descripcion, estado, usuarioId) VALUES ("Pago agua", "Pagar el agua", 0, 5);

--Pagos
INSERT INTO Pagos (detalles, monto, tipo, propiedadid) VALUES ('Pago de luz', 500, 'Mensual', 2);

SELECT * FROM Usuarios;
SELECT * FROM Propiedades;
SELECT * FROM Clientes;
SELECT * FROM Eventos;
SELECT * FROM Pagos;

DROP TABLE Usuarios;
DROP TABLE Propiedades CASCADE;
DROP TABLE Clientes;
DROP TABLE Eventos;
DROP TABLE Pagos;