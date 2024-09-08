
# API Padel Arena 

Una API para gestionar y organizar torneos de manera eficiente. Permite a los usuarios crear, administrar y seguir torneos de Padel, incluyendo la gestión de equipos, partidos y resultados.

### Características:

- Creación y edición de torneos
- Gestión de equipos y jugadores
- Programación y seguimiento de partidos
- Registro y visualización de resultados
- Estadísticas y clasificaciones en tiempo real
- Chat global de todos los usuarios

## Correlo en entorno local

Clona el Repositorio

```bash
  git clone https://github.com/estebannecuse/PadelArena-Back.git
```

Muevete al directorio del projecto

```bash
  cd my-project
```

Instala las dependencias

```bash
  npm install
```

Levanta el servidor y dejalo escuchando

```bash
  npm run start:dev
```

## Variables de entorno

Para levantar el proyecto es importante tener las siguientes variables de entorno en un archivo '.env.development'

- `DB_NAME`: `Nombre de la base de datos`
- `DB_HOST`: `Nombre del host`
- `DB_PORT`: `Puerto en el que se encuentra levantada la base de datos`
- `DB_USERNAME`: `Nombre de usuario de la base de datos`
- `DB_PASSWORD`: `Constraseña del usuario de la base de datos`
- `JWT_SECRET`: `Firma de JWT`
- `CLOUDINARY_CLOUD_NAME`: `Nombre asignado por cloudinary`
- `CLOUDINARY_API_KEY`: `Api key asignada por cloudinary`
- `CLOUDINARY_API_SECRET`: `Api secret asignada por cloudinary`
- `SERVER_PORT`: `Puerto donde se encuentra levantado el servidor`
- `DROP_SCHEMA`: `En caso de trabajar en equipo, es buena idea tener el drop schema en las variables de entorno, esto podes ponerlo a comodidad`
- `ACCESS_TOKEN`: `Token de acceso proporcionado por Mercado Pago`
- `MP_SECRET_KEY`: `Secret key proporcionada por mercado pago`
- `EMAIL_PASSWORD`: `Contraseña de aplicaciones para nodemailer`
- `EMAIL`: `Mail desde donde enviar las notificaciones con nodemailer (recuerda configurar la cuenta)`

## Referencias principales de la API

#### Swagger

```http
  GET /api
```

#### Iniciar de sesion por google

```http
  GET /auth/google-sign
```

| Body | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Requerido**. Nombre del usuario. |
| `email` | `string` | **Requerido**. Email del usuario.

`Para conocer las otras formas de iniciar sesion, visita swagger`

#### Buscar usuarios por categoria

```http
  GET /users/category/{categoryId}
```

| Parametros | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `categoryId`      | `string` | **Requerido**. Id de la categoria. |

#### Cambiar la categoria de los usuarios

```http
  PUT /users/updateCategory/{userId}
```

| Parametros | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Requerido**. Id del usuario. |

| Body | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `uuid` | **Requerido**. |

`La categoria solo puede ser cambiada por el administrador`

#### Buscar los torneos donde el usuario esta vinculado

```http
  GET /users/tournament/{userId}
```

| Parametros | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Requerido**. Id del usuario. |

#### Obtener las categorias

```http
  GET /category
```

#### Subir un equipo

```http
  PUT /tournament-team/{tournamentId}
```

| Parametros | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `tournamentId`      | `string` | **Requerido**. Id del torneo. |

| Body | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `user 1`      | `uuid` | **Requerido**. |
| `user 2`      | `uuid` | **Requerido**. |

#### Crear un torneo

```http
  POST /tournament/new
```

| Body | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Requerido**. Nombre del torneo. |
| `startDate`      | `string` | **Requerido**. Fecha de inicio prevista. |
| `endTime`      | `string` | **Requerido**. Fecha de final prevista. |
| `playingDays`      | `string` | **Requerido**. Array con dias de la semana a jugar. Ejemplo: ['Lunes', 'Martes']. |
| `teamsQuantity`      | `number` | **Requerido**. Cantidad de equipos a jugar (16). |
| `matchDuration`      | `number` | **Requerido**. Duracion prevista para cada partido. |
| `courts`      | `number` | **Requerido**. Cantidad de canchas disponibles para desarrollar el torneo. |
| `description`      | `string` | **Requerido**. Pequeña descripcion del mismo (aqui puede ir el premio). |
| `tournamentFlyer`      | `string` | **Opcional**. Flyer representativo del torneo. |
| `category`      | `string` | **Requerido**. Categoria sobre la cual se desarrollará el torneo. |
| `price`      | `number` | **Requerido**. Precio de la inscripción. |
| `plusCode`      | `string` | **Requerido**. Para la geolocalizacion es necesario ingresar el pluscode de google maps. |

#### Ingresar el equipo ganador de un partido

```http
  PUT /tournamentfixture/matchWinner/{winnerId}
```

| Parametros | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `winnerId`      | `string` | **Requerido**. Id del equipo ganador. |

| Body | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `matchId`      | `string` | **Requerido**. Id del partido en cuestión. |

#### Ejecutar un pago

```http
  POST /mercado-pago/create_preference
```

`No es necesario enviar nada, ya que esta funcion retorna el link de redireccion a mercado pago`
## Authors

- [@Agusdor96](https://github.com/Agusdor96)
- [@estebannecuse](https://github.com/estebannecuse)
- [@Anacasconi1](https://github.com/Anacasconi1)

## Tecnologias utilizadas

**Servidor:** Nest.js, TypeORM, PostgreSQL, Socket.io, Crypto.js, JWT, OAuth, Checkout Pro, Typescript. 
