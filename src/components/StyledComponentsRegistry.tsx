import React from 'react';
import { StyleSheetManager } from 'styled-components';
import { useServerInsertedHTML } from 'astro-react';
import { ServerStyleSheet, StyleSheet } from 'styled-components';

// Este componente envuelve la aplicación y se asegura de que los estilos de styled-components
// se inserten correctamente en el HTML generado por el servidor
export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Solo necesitamos esto en el lado del servidor
  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  // Creamos una hoja de estilos en el servidor
  const styledComponentsStyleSheet = new ServerStyleSheet();
  
  // Recolectamos los estilos
  const app = (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );

  // Insertamos los estilos en el HTML
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.seal();
    return <>{styles}</>;
  });

  return app;
} 