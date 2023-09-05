# bolsiyo

## Pasos para probar la api

### configuracion inicial
- crear un archivo llamado .env con las mismas variables que tiene el archivo .env.example que se encuentra 
en la raiz del proyecto
- correr el comando ``` npm run install ```

### configuracion base de datos
para crear la base de datos se puede hacer de dos formas
1. ejecutando el comando ``` npm run migrate ```, si se toma esta opcion tener en cuenta que el modelo de negocio no se interactua por la 
api asi que debe crear un registro en la tabla business
2. importar el archivo llamado bolsiyo.sql que se encuentra en la carpeta /apiDcoumentation al motor de base de 
de datos MYSQL, este ya tiene datos poblados

### probando los servicios

> Nota: dentro de la carpeta /apiDcoumentation hay un archivo llamado bolsiyo.collection.json este es el archivo
> que se debe importar a postman


#### modulo de usuario
 - servicio crear un usuario nuevo **POST localhost:3000/users**

### modulo de autentificacion
- servicio de login **POST localhost:3000/login**
> Nota: este servicio es el mas importante ya que este es el que devuelve el token para seguir interactuando con la api

### modulo de categorias
- servicio de crear una categoria **POST localhost:3000/categories/**
- servicio de eliminar una categoria **DEL localhost:3000/categories/**
- servicio de listar categorias por negocio **GET localhost:3000/categories/business/1**

### modulo de productos
- servicio de crear un producto **POST localhost:3000/products/**
- servicio de eliminar un producto **DEL localhost:3000/products/**
- servicio de actualizar un producto **PUT localhost:3000/products/**
- servicio de actualizar el stock de un producto **PUT localhost:3000/products/stock**
- servicio de listar productos por negocio **GET localhost:3000/products/business/1**

### modulo de reportes
- servico de reporte de productos **GET localhost:3000/reports/products?startDate=2023-05-09&endDate=2023-09-30**

