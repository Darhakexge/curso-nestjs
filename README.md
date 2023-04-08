<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```shell
npm install --only-lock
```

3. Tener Nest CLI instalado

```shell
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```shell
docker-compose up -d
```

5. Configurar las variables de entorno

```shell
cp .env.example .env
```

5. Ejecutar los seeds

```shell
localhost:3000/seed
```

## Stack usado

-   MongoDB
-   Nest

## Despliegue en producción

1. Configurar las variables de entorno

```shell
cp .env.example .env
```

2. Crear la imagen de Docker

```sh
docker-compose -f docker-compose.prod.yaml up --build -d
```
