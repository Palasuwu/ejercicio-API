# Laboratorio de APIs - Tecnologías Web

Este proyecto corresponde al laboratorio de APIs de la clase de Tecnologías Web. La API está desarrollada en Python utilizando el framework Flask y se ha probado en un servidor local.

## Descripción parte 1 
El esqueleto entregado actualmente es una API sencilla que incluye una función GET para obtener información de un usuario. La información retornada incluye el nombre, el user-id y el hobby del usuario. Además, se ha implementado una función POST que fue probada utilizando Postman.

## Descripcion parte 2 
La api realizada se basa en un sistema de tickets de incidentes de dispositivos en un entorno laboral interno . La api se conecta a una base de datos de PostgresSQL . Tiene distintas funciones , tiene un GET general que nos das todos los incidentes y sus datos , un GET por ID este nos da un incidente especifico dentro de la base de datos , un metodo POST para crear un ticket de Inciente , un metodo PUT  para actualizar los datos dentro de un incidente existente por ID y un metodo DELETE que borra un incidente de la base de datos por su ID . 

## Tecnologías utilizadas
- Python
- Flask
- Visual Studio Code
- Postman
- flask_sqlalchemy
- psycopg2-binary

## Requisitos para probar la api localmente 
- Python 3.8 o superior instalado.

- PostgreSQL instalado.

- Un editor de código como Visual Studio Code (opcional).

- El programa de Postman (para probar los endpoints).

### 1. Instalar PostgreSQL

Descarga e instala PostgreSQL desde el sitio oficial:

https://www.postgresql.org/download/


---

### 2. Instalar librerías necesarias

#### En macOS o Linux:

```terminal

pip3 install flask flask_sqlalchemy psycopg2-binary

```
## Posible problema al instalar `psycopg2-binary` en macOS

Si al instalar ves un error como:

```
pg_config executable not found.
```

Sigue estos pasos:

1. Encuentra el archivo `pg_config`:

```bash
find / -name pg_config 2>/dev/null
```

Ejemplo de resultado:

```
/Library/PostgreSQL/17/bin/pg_config
```

2. Agrega esa ruta a tu entorno temporalmente:

```bash
export PATH="/Library/PostgreSQL/17/bin:$PATH"
```

3. Instala de nuevo:

```bash
pip install psycopg2-binary
```

---
#### En Windows:

```bash

pip install flask flask_sqlalchemy psycopg2-binary

```
### Clona el Repositorio o copialo dentro de un archivo nuevo de python 


## Configuración de la base de datos

1. Abre PostgreSQL (psql o pgAdmin)
2. Ejecuta:

```sql
CREATE DATABASE incidentes_db;

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    reporter VARCHAR(100) NOT NULL,
    description TEXT NOT NULL CHECK (char_length(description) >= 10),
    status VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Insert generico en dato caso que se quiera llenar la base datos antes de probar el
--GET
INSERT INTO incidents (reporter, description, status) VALUES
('Andrea ', 'La computadora no prende desde ayer.', 'pendiente'),
('Luis ', 'La impresora principal no imprime.', 'en proceso'),
('Carmen ', 'Se cayó el Wi-Fi en la sala de reuniones.', 'resuelto'),
('Javier ', 'El teclado está dañado.', 'pendiente'),
('Gabriela ', 'Problemas con el proyector del salón 3.', 'en proceso');

```

- Asi se deberia de ver en POSTGRES 

<img width="1157" alt="Screenshot 2025-04-03 at 3 43 39 PM" src="https://github.com/user-attachments/assets/92e6ed18-54ed-4478-999b-e6a765b84bc8" />
- Luuego de haber corrido lo querys  , dirijete al apartado PSQL Tool workspace y te aparecera esta ventana : 
<img width="1157" alt="Screenshot 2025-04-03 at 3 45 17 PM" src="https://github.com/user-attachments/assets/afa954bf-ba1a-4ad4-9ee1-551f8e32ad1d" />

- Ahi selecciona la base de datos recien creado , pon la contraseña a usar y ahi aparecera la coneccion local junto a su port .
- Darle clik a "Connect & Open PSQL" .

- En esa consola puedes correr este comando para verificar la conexion local :

```sql
 \conninfo
 ```

- Esta seria la salida de ese comando 

  <img width="998" alt="Screenshot 2025-04-03 at 3 50 01 PM" src="https://github.com/user-attachments/assets/b73534e3-1d02-4fa0-b97f-03a023ce6d9f" />

## Ya en el codigo 

dirigete al apartado de "Configuracion de Base de datos "

```python


## Configuracion hacia la base de datos 
app.config['SQLALCHEMY_DATABASE_URI'] =
'postgresql://postgres:2604@localhost:5432/incidentes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

 ```

 - Y donde dice "2604" Pon la contraseña que pusiste anteriormente y en el caso que no se inicio la direccion en el port generico de PGadmin4 puedes cambiarlo ahi

 - Y corre el codigo
 - (Si y SOLO SI se hicieron los insert opcionales en Postgres al correr el main.py en la consola del IDE apareceran los datos genericos dentro significando una coneccion exitosa a la base de datos)

- Asi deberia de verse la consola , copia el link y dirigamonos a POSTMAN 

  <img width="704" alt="Screenshot 2025-04-03 at 3 58 01 PM" src="https://github.com/user-attachments/assets/e87cafb7-1417-4d77-b952-5c5b3e84cf11" />


## Procesos en POSTMAN 

### `POST /incidents` – Crear un nuevo incidente

**URL:**  
`http://127.0.0.1:5000/incidents`

**Método:** `POST`  
**Headers:**  
`Content-Type: application/json`  
**Body (raw, JSON):**

```json
{
  "reporter": "Ana Prueba ",
  "description": "El monitor parpadea y no funciona correctamente."
}
```
### Respuesta Esperada 
<img width="836" alt="Screenshot 2025-04-03 at 4 05 54 PM" src="https://github.com/user-attachments/assets/97277843-188f-4a76-afb5-200867e1591d" />

---

### `GET /incidents` – Obtener todos los incidentes

**URL:**  
`http://127.0.0.1:5000/incidents`

**Método:** `GET`  
**Body:** No se necesita  

### Respuesta Esperada
<img width="836" alt="Screenshot 2025-04-03 at 4 09 50 PM" src="https://github.com/user-attachments/assets/a9dee788-5691-4b2a-adcb-5f2d3f6c50ad" />


---




### `GET /incidents/{id}` – Obtener un incidente por ID

**URL:**  
`http://127.0.0.1:5000/incidents/1`

**Método:** `GET`  
**Body:** No se necesita  

### Resultado Esperado 

<img width="836" alt="Screenshot 2025-04-03 at 4 11 20 PM" src="https://github.com/user-attachments/assets/9e65ffd7-ef4a-499e-837e-82a1720cb605" />


---

### `PUT /incidents/{id}` – Actualizar estado del incidente

**URL:**  
`http://127.0.0.1:5000/incidents/1`

**Método:** `PUT`  
**Headers:**  
`Content-Type: application/json`  
**Body (raw, JSON):**

- Ejemplo Actualizacion de status 

```json
{
  "status": "resuelto"
}
```
### Resultados Esperados


<img width="836" alt="Screenshot 2025-04-03 at 4 12 45 PM" src="https://github.com/user-attachments/assets/3ba0f301-f6c8-4d6f-a47c-6a37571584a6" />

<img width="836" alt="Screenshot 2025-04-03 at 4 13 12 PM" src="https://github.com/user-attachments/assets/7bde7e9b-c7b0-47ea-b5ad-2450011ce5e4" />




---

### `DELETE /incidents/{id}` – Eliminar un incidente

**URL:**  
`http://127.0.0.1:5000/incidents/1`

**Método:** `DELETE`  
**Body:** No se necesita  

### Resultados Esperados 

<img width="836" alt="Screenshot 2025-04-03 at 4 14 04 PM" src="https://github.com/user-attachments/assets/b0cfdf9a-cb66-4468-a649-d4728a73cd00" />

<img width="836" alt="Screenshot 2025-04-03 at 4 14 27 PM" src="https://github.com/user-attachments/assets/04f5f08b-7c1f-4bb4-b40b-c4b9da2337a9" />



---

### Prueba FrontEnd exitosa 

<img width="719" alt="Screenshot 2025-04-08 at 8 37 26 PM" src="https://github.com/user-attachments/assets/f004d3b4-656c-4348-aefe-34e129d1b113" />

## Entrega abril 10 

<img width="803" alt="Screenshot 2025-04-10 at 8 57 08 PM" src="https://github.com/user-attachments/assets/9aee4bae-cff8-416d-98a3-77bedeafd52e" />

<img width="501" alt="Screenshot 2025-04-10 at 9 03 01 PM" src="https://github.com/user-attachments/assets/0e1de8fa-e154-4300-8b1f-d08cd2e11c0c" />

Jorge Palacios - 231385

