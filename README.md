<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Henry

## Objetivos del Proyecto

- Construir una App JavaScript desde cero.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Utilizar Metodologías Ágiles.
- Trabajar en equipo.

## Screens del E-Commerce

<p align='left'>
    <img src='http://res.cloudinary.com/gonzaloaguilarm/image/upload/v1612195769/Home_alcrhs.jpg' </img>
</p>

<p align='left'>
    <img src='http://res.cloudinary.com/gonzaloaguilarm/image/upload/v1612195932/Products_fr9o6b.jpg' </img>
</p>

<p align='left'>
    <img src='http://res.cloudinary.com/gonzaloaguilarm/image/upload/v1612196041/Carrito_qsxoji.jpg' </img>
</p>

<p align='left'>
    <img src='http://res.cloudinary.com/gonzaloaguilarm/image/upload/v1612196117/ProductList_wb2lgl.jpg' </img>
</p>

<p align='left'>
    <img src='http://res.cloudinary.com/gonzaloaguilarm/image/upload/v1612196262/AccountSettings_fkkn61.jpg' </img>
</p>

## Trabajo en Equipo

En este proyecto, se trabajo junto a un equipo de 6 estudiantes.
Utilizando  **GIT** para gestionar el código y **Trello** para gestionar el proyecto y facilitar la colaboración. 
Se utilizo el siguiente *workflow* para una tarea dada:

- Crear una Card de Trello para una tarea.
- Asignar un equipo de dos para trabajar en la tarea.
- Hacer un `branch` por cada card de trello (incluir el nombre o ID de la card en el nombre de la branch).
- Codear en equipo hasta completar la tarea.
- Pullear de master a nuestra branch (para mergear código nuevo de master).
- Pushear nuestra Branch a git y hacer un `PR` indicando la Card que cierra.
- Mover la Card de trello a `Review`.
- Asignar a otro equipo de dos para que revise el `PR`.
- Iterar hasta que no haya más comentarios:
    + Si hay un comentario, el equipo original debe codear de nuevo la solución y volver a subir el código a github.
    + Si no hay comentarios, se aprueba el `PR` y se mergea a master
- Mergear el `PR` a master.
- Volver al punto 1 hasta terminar el proyecto.

## Horarios y Fechas

El proyecto tubo una duracion de cuatro semanas. El lunes siguiente al terminar el sprint se realizaba una demo donde se muestra al TL el progreso de esa semana. La última semana tiene el `demo final` donde se mostró el proyecto terminado.

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.
En `api` se creo un archivo llamado: `.env` con credenciales propias  para conectarse a la base de datos creada en postgres
El contenido de `client` fue creado usando: Create React App.

### Funcionalidades

La aplicación del e-commerce cuenta con las siguientes funcionalidades

### Usuarios no Autenticados

Un Visitante anónimo puede navegar el e-commerce, ver y buscar productos.

###### Como un Guest puede...

- PRODUCTOS:
    + ...ver la lista completa de productos (catálogo), para ver todo lo disponible para comprar.
    + ...refinar el listado por categorías, para poder ver los items en los que estoy interesado.
    + ...buscas productos, para poder encontrar rápido los productos que quiero comprar.
    + ...ver los detalles de un producto individual (incluida las fotos, descripciones, reviews, etc...), asi puede determinar si quiero ese producto o no.

- CARRITO:
    + ...poder agregar items a mi carrito de compras desde el listado o desde a página de detalles de un producto, para poder comprarlos despues.
    + ...sacar items de mi carrito, en caso que decida no quererlos.
    + ...editar cantidades de los items de mi carrito, en caso que quiera mas o menos cantidad de un item en particular.
    + ...refrescar la página, o irme y volver, y todavía tener mi carrito de compras (sin haberme creado una cuenta). (Podés usar sessionStorage, localStorage, cookies, o JWT).
    + ...poder crearme una cuenta, loguearme y seguir editando ese mismo carrito, asi no pierdo los items seleccionados.
- CHECKOUT:
    + ...poder comprar todos los items de un mi carrito.
    + ...especificar una dirección de envio y un email cuando hago el checkout, asi me envien la compra a lugar que dije.
    + ...recibir un email de confirmación que hice la compra.
    + ...recibir un email de notificación cuando la orden fue despachada.
- GESTION DE CUENTA:
    + ...poder crear una cuenta, asi puede hacer otras cosas como dejar un review.
    + ...poder logearme usando Google o Github, para no tener que acordarme de un password nuevo.

### Usuarios Autenticados

Los usuarios que hayan creado su cuenta, pueden hacer todo lo que puede hacer un usuario guest y además:

- GESTION DE CUENTA:
    + ...puede desloguerse, asi nadie más pueda usar su sesión.
    + ...ver el historial de ordenes previas, asi puede reever las ordenes que hiczo en el pasado.
    + ...ver los detalles de una orden que hizo en el pasado, incluyendo:
        * Los items comprados, con sus cantidades.
        * Links a la página del producto comprado.
        * Fecha y hora de la compra.
- REVIEWS:
    + ...puede dejar reviews a los productos, que incluyan texto y un sistema de cinco estrellas.

### Admin

Los usuarios administradores pueden manejar el sitio, los productos que se listan y los items que están disponibles.

- GESTION DE PRODUCTOS:
    + ...puede crear y editar productos, con nombre, descripción, precio y uno o más fotos, tal que los visitantes puedan ver la última información de lo que se vende.
    + ...puede crear categorías, para que los usuarios puedan filtrar los items.
    + ...puede agregar o sacar categorías de los items (los items deben poder aceptar múltiples categorías).
    + ...gestiona la disponibilidad de un item. (un item que no esta disponible, no deberá estar listado en la página, pero su detalle debe seguir siendo accesible desde el historial de compras o con su URL, pero debe mencionar que el item no está disponible).

- GESTION DE ORDENES:
    + ...puede ver una lista de todas las ordenes, para poder ver y revisar las ordener.
    + ...puede filtrar as ordenes por su estado (creada, procesando, cancelada, completa).
    + ver los detalles de una orden específica, asi puedo revisarla y actualizar su estado.
    + ...puede cambiar el estado de una orden (creada => procesando, procesando => cancelada || completa).

- GESTION DE USUARIOS:
    + ...puede hacer que un usuario se convierta en admin.
    + ...borrar a un usuario, asi no puedan logearse más.
    + ...forzar una password reset para un usuario.

### Validación de Datos

Al crear los modelos,se consideran los tipos de datos que se van a recibir, qué cosas van a ser requeridas y cómo se devuelven los errores a los usuarios.
Algunas constrains implementadas:

- Productos:
    + Deben tener `titulo`, `descripcion`, `precio`, `cantidad`
    + Deben pertenecer a por lo menos una categoría.
    + Deben tener una foto, si no tienen una foto, deben tener un placeholder de foto por defecto.
- Usuarios:
    + Deben tener una dirección de mail válida.
    + Su email debe ser único.
- Ordenes:
    + Una orden debe pertenecer a un usuario o a un guest (autenticado vs no autenticado).
    + Las ordenes deben tener línea de orden que contiene el `precio`, `productId`, y `cantidad`.
    + Si un usuario completa una orden, esa orden debe mantener el precio del item al momento de la compra, sin importar que el precio del producto cambie después.
- Reviews:
    + Todas las reviews deben pertenecer a un producto.
    + Todas las reviews deben pertenecer a un usuario.
    + Todas las reviews deben tener por lo menos x caractéres.

