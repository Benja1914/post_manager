# Post Manager

**Post Manager** es una API REST construida con [NestJS](https://nestjs.com/) usando TypeScript y TypeORM para la gestión de posts.  
La aplicación estandariza las respuestas HTTP y está completamente documentada con Swagger.

## Características

- **NestJS** + **TypeScript**: Framework robusto y tipado para Node.js.
- **TypeORM**: ORM para la gestión de la base de datos PostgreSQL.
- **Respuestas HTTP estandarizadas**: Todas las respuestas siguen un formato consistente.
- **Swagger**: Documentación interactiva de la API.
- **CRUD de Posts**: Crear, eliminar y listar posts.
- **pnpm**: Gestor de paquetes rápido y eficiente.

## Uso de pnpm

Este proyecto utiliza [pnpm](https://pnpm.io/) como gestor de paquetes.  
**Ventajas de pnpm:**
- Instalaciones más rápidas y eficientes.
- Ahorro de espacio en disco gracias a enlaces simbólicos.
- Mejor manejo de dependencias y monorepositorios.

Para instalar dependencias:
```bash
pnpm install
```

## Levantar el proyecto

Para iniciar el servidor de desarrollo ejecuta:
```bash
pnpm run dev
```

## Documentación Swagger

Accede a la documentación interactiva en:  
[http://localhost:8080/docs](http://localhost:8080/docs)

## Repositorio

GitHub: [https://github.com/Benja1914/post_manager](https://github.com/Benja1914/post_manager)

## Endpoints principales (Posts)

### Crear un post

```bash
curl --request POST \
  --url http://localhost:8080/api/post/create \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Mi primer post",
    "description": "Este es el contenido del post."
  }'
```

### Eliminar un post por id

```bash
curl --request DELETE \
  --url http://localhost:8080/api/post/1
```

### Obtener lista de posts

```bash
curl --request GET \
  --url http://localhost:8080/api/post
```