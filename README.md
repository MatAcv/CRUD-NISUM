# Aplicacion CRUD de Películas en estreno (NISUM)

El actual proyecto contiene un CRUD utilizando la api de TheMobieDB (https://api.themoviedb.org/). El motivo del uso de esta API es por su rapida implementacion y
documentación clara.

## Funcionalidades

La aplicacion permite:
-Hacer un fetch de todas las peliculas en cartelera y próximos estrenos. 
-Editar Nombre e imagen de poster de la pelicula seleccionada.
-Eliminar pelicula seleccionada.
-Agregar una nueva pelicula.
-Reiniciar peliculas a su estado original.

## Almacenamiento y manejo de peliculas.

Si bien para obtener la cartelera se ocupa la API de TheMovieDB, el manejo de estados se realiza a través del  `localStorage`

## Biblioteca de componentes

Se esta utilizando Angular Material para la aplicación.

## Build

Para ejecutar este proyecto, realice su respectivo  `git clone` y posteriormente ejecute `npm install` para instalar todas las dependencias del proyecto.
Para levantar servidor ejecutar `ng serve -o`
