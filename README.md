# UGPS Videojuegos App

Aplicación web para buscar y visualizar información sobre videojuegos, desarrollada como prueba técnica para UGPS.

## Demo

[Ver Demo en GitHub Pages](https://tathatahy.github.io/ugps-videojuegos-app)

## Características

- Listado de videojuegos ordenados por puntuación Metacritic
- Filtros por año, género, plataforma, tags y desarrolladores
- Búsqueda por texto
- Página de detalle con información completa de cada juego
- Interfaz responsive con tema oscuro

## Tecnologías utilizadas

- [Astro](https://astro.build/) - Framework para construir sitios web rápidos
- [React](https://reactjs.org/) - Biblioteca para interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para JavaScript
- [RAWG API](https://rawg.io/apidocs) - API de información de videojuegos

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tathatahy/ugps-videojuegos-app.git

# Ingresar al directorio
cd ugps-videojuegos-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Estructura del proyecto

```
ugps-videojuegos-app/
├── public/             # Archivos estáticos
├── src/
│   ├── components/     # Componentes React
│   ├── layouts/        # Plantillas de página
│   ├── pages/          # Páginas de la aplicación
│   ├── services/       # Servicios de API
│   ├── styles/         # Estilos CSS
│   └── types/          # Definiciones de tipos
└── package.json
```

## Decisiones de diseño

- Utilicé Astro por su excelente rendimiento y soporte para SSR (Server-Side Rendering)
- Incorporé React para los componentes interactivos
- Implementé CSS tradicional en lugar de styled-components para evitar problemas con el SSR
- Diseño responsive con enfoque mobile-first

## Autor

[Tathatahy](https://github.com/tathatahy)

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](https://opensource.org/licenses/MIT).
