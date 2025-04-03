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

Recuerda guardar:
- Tu **nombre de usuario** (por defecto: `postgres`)
- Tu **contraseña**
- El **número de puerto** (por defecto: `5432`)

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



   
## Autor
Jorge Palacios

