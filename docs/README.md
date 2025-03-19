# Documentación del Proyecto UGPS Videojuegos

## Descripción
Aplicación web desarrollada con Astro y React que permite buscar y visualizar información sobre videojuegos utilizando la API pública de RAWG.

## Tecnologías utilizadas
- **Astro**: Framework web para la creación de sitios web rápidos y optimizados
- **React**: Biblioteca para construir interfaces de usuario
- **Styled Components**: Para el estilizado de componentes
- **Axios**: Para realizar peticiones HTTP a la API
- **React Router DOM**: Para la navegación entre páginas

## Estructura del proyecto
```
├── src/
│   ├── components/     # Componentes React reutilizables
│   ├── pages/          # Páginas de la aplicación
│   ├── layouts/        # Layouts de Astro
│   ├── services/       # Servicios para interactuar con la API
│   ├── types/          # Definiciones de tipos TypeScript
│   ├── hooks/          # Hooks personalizados
│   ├── contexts/       # Contextos de React
│   └── assets/         # Archivos estáticos
├── public/             # Archivos públicos accesibles directamente
└── docs/               # Documentación del proyecto
```

## Funcionalidades
- Página de inicio con lista de videojuegos ordenados por puntuación Metacritic
- Filtrado por año, género, plataformas, tags y empresa desarrolladora
- Búsqueda de videojuegos por texto
- Página de detalle para cada videojuego
- Visualización de trailers cuando estén disponibles

## API RAWG
La aplicación utiliza la API de RAWG para obtener información sobre videojuegos.
API Key: `3b5d4e604c384b778fc5a6d58b17a484`
Documentación de la API: https://rawg.io/apidocs 