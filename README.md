
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

#### [SwaggerDocu](https://padelarena.onrender.com/api)
⏰ La documentacion demora la menos 1 minutos en cargar ya que la app esta deployada en la version gratuita de render



## Authors

- [@Agusdor96](https://github.com/Agusdor96)
- [@estebannecuse](https://github.com/estebannecuse)
- [@Anacasconi1](https://github.com/Anacasconi1)

## Tecnologias utilizadas

**Servidor:** Nest.js, TypeORM, PostgreSQL, Socket.io, Crypto.js, JWT, OAuth, Checkout Pro, Typescript. 
