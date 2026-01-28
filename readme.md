# Social Media Platform - Full Stack Project

Un proyecto de plataforma de redes sociales construido con arquitectura de microservicios, que incluye backend escalable, frontend moderno y documentación técnica completa.

## Primera carga del usuario incial
En la raiz de este repositorio se encuentra un script sql para cuando este conectado a la base de datos pueda correrlo cargar el usuario inicial. Tenga en cuenta que esto lo hace en la base de datos de usuarios.

correo: admin@socialmedia.com
password: admin1234

## 🏗️ Arquitectura del Sistema

### Backend - Microservicios (NestJS)
- **API Gateway**: Punto de entrada único para todas las peticiones HTTP
- **Auth Service**: Gestión de autenticación y tokens JWT
- **Users Service**: Administración de usuarios y perfiles
- **Posts Service**: Manejo de publicaciones y contenido

### Frontend (React/Vue/Angular)
- Interfaz de usuario moderna y responsiva
- Gestión de estado centralizada
- Autenticación con JWT
- Comunicación con API RESTful

## 🚀 Características Principales

### Funcionalidades de Usuario
- ✅ **Autenticación**: Sistema seguro con JWT
- ✅ **Creación de Posts**: Publicación de contenido con texto e imágenes
- ✅ **Feed de Posts**: Visualización de posts de otros usuarios

### Características Técnicas
- 🏗️ **Arquitectura de Microservicios**: Escalabilidad y mantenimiento
- 🔒 **Seguridad**: Autenticación JWT, validación de datos, sanitización
- 📊 **Base de Datos**: PostgreSQL con relaciones optimizadas
- 🐳 **Containerización**: Docker para desarrollo y producción
- 📝 **Documentación**: Swagger/OpenAPI para APIs

## 🛠️ Tecnologías Utilizadas

### Backend
- **Framework**: NestJS (Node.js)
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator, Joi
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest

### Frontend
- **Framework**: React
- **Lenguaje**: TypeScript
- **Gestión de Estado**: Zustand
- **Estilos**: Tailwind CSS/ShadcnUI
- **Build Tool**: Vite

## 🔒 Seguridad

- **Autenticación**: JWT con refresh tokens
- **Validación**: Sanitización de inputs y validación de esquemas
- **Encriptación**: Passwords hasheadas con bcrypt
- **CORS**: Configurado para dominios específicos

## 🌐 Despliegue

### Desarrollo Local
```bash
# Clonar repositorio
git clone <repository-url>
cd social-media-platform

# Backend
cd backend/socialmedia-micro
docker-compose up --build

# Frontend
cd ../../frontend
npm install && npm start
```

## 📞 Contacto

- **Desarrollador Principal**: Luis David Montiel Montes
- **Email**: ld.montielm@gmail.com
- **LinkedIn**: [tu-perfil-linkedin]
- **GitHub**: [tu-usuario-github]
---

**Nota**: Este proyecto es parte de un portafolio técnico que demuestra competencias en desarrollo full-stack, arquitectura de microservicios y buenas prácticas de desarrollo de software.