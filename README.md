# Llanos Auditores - Plantilla Web

Esta es una plantilla web profesional para Llanos Auditores, basada en el diseño y estructura de ProData Servicios, adaptada específicamente para servicios de auditoría y consultoría contable.

## 🚀 Características

- **Diseño Responsivo**: Compatible con dispositivos móviles, tablets y escritorio
- **Animaciones Suaves**: Efectos de transición y animaciones CSS/JavaScript
- **Formulario de Contacto**: Sistema de contacto funcional con validación
- **Secciones Optimizadas**: Estructura clara para servicios de auditoría
- **SEO Friendly**: Código optimizado para motores de búsqueda

## 📁 Estructura del Proyecto

```
llanosauditores/
├── index.html          # Página principal
├── styles.css          # Estilos CSS personalizados
├── script.js           # JavaScript funcional
├── assets/             # Carpeta para imágenes y recursos
│   ├── logo.svg
│   ├── hero-audit.jpg
│   ├── client-1.png
│   ├── case-1.jpg
│   └── ...
└── README.md           # Este archivo
```

## 🎨 Secciones Incluidas

### 1. **Header/Navegación**
- Logo y menú de navegación
- Links a servicios, industrias, blog y contacto
- Botón de llamada a la acción

### 2. **Hero Section**
- Mensaje principal de valor
- Descripción de servicios
- Botón para agendar consulta
- Imagen representativa

### 3. **Logos de Clientes**
- Sección para mostrar empresas que confían en los servicios
- Efectos hover y animaciones

### 4. **Nuestro Modelo**
- Metodología de trabajo
- Beneficios para el cliente
- Iconos representativos del servicio

### 5. **Servicios**
- **Auditoría Externa**: Auditorías independientes
- **Auditoría Interna**: Evaluación de controles internos
- **Consultoría Tributaria**: Planificación y cumplimiento fiscal
- **Asesoría Contable**: Servicios contables integrales

### 6. **Industrias**
- Tabs dinámicos por sector
- Casos de éxito por industria
- Testimonios de clientes

### 7. **Testimonios**
- Carousel con testimonios reales
- Navegación automática y manual

### 8. **Llamada a la Acción**
- Sección para conversión
- Botón prominente de contacto

### 9. **Demostración/Consulta**
- Información sobre consulta gratuita
- Imagen y descripción del proceso

### 10. **Contacto**
- Formulario funcional
- Información de contacto
- Mapa (ubicación)
- Enlaces a redes sociales

### 11. **Footer**
- Información de la empresa
- Enlaces adicionales
- Derechos de autor

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y animaciones
- **JavaScript ES6+**: Funcionalidad interactiva
- **Bootstrap 5.3.2**: Framework CSS responsivo
- **Font Awesome 6.4.0**: Iconografía

## 🎨 Paleta de Colores

```css
:root {
    --primary-color: #1e3a5f;      /* Azul oscuro profesional */
    --secondary-color: #4a90a4;    /* Azul medio */
    --accent-color: #f39c12;       /* Naranja/amarillo */
    --success-color: #27ae60;      /* Verde */
    --light-gray: #f8f9fa;         /* Gris claro */
    --dark-gray: #2c3e50;          /* Gris oscuro */
}
```

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: 576px, 768px, 992px, 1200px
- **Grid System**: Bootstrap grid para layouts flexibles

## ⚡ Funcionalidades JavaScript

### Navegación
- Scroll suave entre secciones
- Navbar con efecto de transparencia al hacer scroll
- Menú móvil colapsible

### Animaciones
- Animaciones de entrada al hacer scroll
- Efectos hover en tarjetas y botones
- Transiciones suaves

### Formularios
- Validación en tiempo real
- Notificaciones de éxito/error
- Prevención de spam básica

### Interactividad
- Carousel automático de testimonios
- Tabs dinámicos para industrias
- Lazy loading de imágenes

## 🖼️ Imágenes Necesarias

Para completar la plantilla, necesitarás agregar las siguientes imágenes en la carpeta `assets/`:

### Logotipos y Branding
- `logo.svg` - Logo principal de Llanos Auditores
- `favicon.ico` - Icono del navegador

### Imágenes de Hero
- `hero-audit.jpg` (1200x800px) - Imagen principal de auditoría

### Logos de Clientes
- `client-1.png` a `client-5.png` (300x150px) - Logos de empresas cliente

### Casos de Éxito
- `case-1.jpg` a `case-3.jpg` (400x300px) - Imágenes de casos de éxito

### Otras
- `demo-image.jpg` (600x400px) - Imagen para sección de demo
- `team-photo.jpg` (800x600px) - Foto del equipo (opcional)

## 🚀 Instalación y Uso

1. **Clonar o descargar** los archivos en tu servidor web
2. **Agregar imágenes** en la carpeta `assets/`
3. **Personalizar contenido** en `index.html`:
   - Cambiar textos por información real de la empresa
   - Actualizar información de contacto
   - Modificar testimonios con casos reales
4. **Ajustar estilos** en `styles.css` si es necesario
5. **Configurar formulario** para envío real de emails

## 🔧 Personalización

### Cambiar Colores
Modifica las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #tu-color-principal;
    --accent-color: #tu-color-acento;
}
```

### Añadir Nuevos Servicios
1. Duplicar una tarjeta de servicio en el HTML
2. Actualizar contenido y enlaces
3. Agregar estilos específicos si es necesario

### Modificar Formulario
1. Actualizar campos en el HTML
2. Ajustar validación en `script.js`
3. Configurar backend para procesamiento

## 📊 SEO y Performance

### Optimizaciones Incluidas
- Meta tags apropiados
- Estructura semántica HTML5
- Imágenes con alt text
- Schema markup (a implementar)
- Lazy loading de imágenes
- CSS y JS minificados (recomendado para producción)

### Mejoras Recomendadas
- Implementar Schema.org markup
- Optimizar tamaño de imágenes (WebP)
- Configurar cache del navegador
- Implementar Service Worker para PWA

## 🔒 Seguridad

### Consideraciones
- Validación de formularios tanto en frontend como backend
- Sanitización de inputs
- Protección CSRF en formularios
- HTTPS obligatorio para producción

## 📞 Información de Contacto por Actualizar

Recuerda actualizar toda la información de contacto en el HTML:

- **Teléfono**: Cambiar `+56 2 2664 1300`
- **Email**: Cambiar `info@llanosauditores.cl`
- **Dirección**: Actualizar dirección real
- **Redes Sociales**: Agregar enlaces reales

## 🎯 Próximos Pasos

1. **Contenido Real**: Reemplazar todo el contenido placeholder
2. **Imágenes Profesionales**: Agregar fotografías de calidad
3. **Backend**: Implementar procesamiento de formularios
4. **Analytics**: Integrar Google Analytics
5. **Testing**: Probar en diferentes dispositivos y navegadores

## 📄 Licencia

Esta plantilla está basada en el diseño de ProData Servicios y adaptada para Llanos Auditores. El código es de uso libre para el proyecto especificado.

---

**Desarrollado para Llanos Auditores - 2024**