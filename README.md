# Laboratorio de APIs - Tecnologías Web

Este proyecto corresponde al laboratorio de APIs de la clase de Tecnologías Web. La API está desarrollada en Python utilizando el framework Flask y se ha probado en un servidor local.

## Descripción
El esqueleto entregado actualmente es una API sencilla que incluye una función GET para obtener información de un usuario. La información retornada incluye el nombre, el user-id y el hobby del usuario. Además, se ha implementado una función POST que fue probada utilizando Postman.

## Tecnologías utilizadas
- Python
- Flask
- Visual Studio Code
- Postman

## Tecnologias Coinsideradas para el futuro 

- PostgresSQL
- MySql 

# Imágenes de Prueba utilizando 
## Se utilizo la extension de VScode "Thunder Client" para el GET 

<img width="836" alt="Screenshot 2025-03-27 at 8 59 48 PM" src="https://github.com/user-attachments/assets/0847e5a6-23e7-4ef7-8b8b-964061e5a5fb" />


## Se utilizo la aplicacion local "POSTMAN" para probar el POST 
Capturas de pantalla de las pruebas realizadas:
<img width="792" alt="Screenshot 2025-03-27 at 8 33 01 PM" src="https://github.com/user-attachments/assets/d2b2aa78-5e46-4162-842d-bad927b22791" />

## Pasos para correr el código

-Instalar la librería Flask.

- En macOS y Linux:
 ```
pip3 install flask 
 ```

- En Windows:
 ```
pip install flask 
```
## Funcion GET en navegador 

- Abrir el archivo main.py y ejecutar el codigo con algun IDE como VISUAL ESTUDIO CODE :


- Probar la función GET abriendo el servidor local en el navegador y agregando a la URL:
 ```
http://localhost:5000/get-user/123
  ```

## Probar la función POST utilizando Postman:
- Descargar e instalar Postman.
- Crear una nueva conexión y cambiar el método de solicitud de GET a POST.
- Colocar la URL del servidor local con el endpoint:
 ```
http://localhost:5000/create-user/
  ```
- Ir a la opción **Body** en Postman, seleccionar **raw** y cambiar el formato a **JSON**.
- Ingresar el siguiente objeto JSON como ejemplo:
  ```json
  {
    "username": "Jorge"
  }
  ```
- Pulsar el botón azul **SEND**.
- Si la solicitud es exitosa, aparecerá una consola mostrando el objeto enviado junto con el mensaje **201 CREATED** en la parte superior.


   
## Autor
Jorge Palacios

