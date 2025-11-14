# Guía de Configuración: Envío de Formularios por Email con EmailJS

## Descripción General

Se ha creado una página separada (`form-handler.html`) que permite:
- ✅ Recopilar datos del formulario de cotización
- ✅ Enviar todos los datos al email: **job.llanos@gmail.com**
- ✅ Ser fácilmente exportable a otras páginas
- ✅ Interfaz moderna y responsiva

## Pasos de Configuración

### 1. Crear una Cuenta en EmailJS

1. Ve a https://www.emailjs.com
2. Haz clic en **"Sign Up for Free"**
3. Completa el formulario de registro
4. Verifica tu email

### 2. Obtener las Credenciales de EmailJS

#### 2.1 Service ID
1. Accede a tu Dashboard en https://dashboard.emailjs.com
2. Ve a **Email Services** en el menú lateral
3. Haz clic en **Create New Service**
4. Selecciona el proveedor de email:
   - **Gmail**: 
     - Usuario: job.llanos@gmail.com
     - Necesitas generar una contraseña de aplicación en Google
   - O cualquier otro proveedor (Outlook, Yahoo, etc.)
5. Copia el **Service ID** (ej: `service_xxxxx`)

#### 2.2 Template ID
1. Ve a **Email Templates** en el menú lateral
2. Haz clic en **Create New Template**
3. Configura la plantilla con el siguiente contenido:

**Asunto:**
```
Nueva Cotización: {{empresa_nombre}}
```

**Cuerpo del Email (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #1e40af; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background: white; padding: 20px; border-radius: 0 0 5px 5px; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #1e40af; }
        .value { color: #555; }
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nueva Solicitud de Cotización</h2>
            <p>De: {{cliente_nombre}}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>Información del Cliente</h3>
                <div class="field">
                    <span class="label">Nombre:</span>
                    <span class="value">{{cliente_nombre}}</span>
                </div>
                <div class="field">
                    <span class="label">Email:</span>
                    <span class="value">{{cliente_email}}</span>
                </div>
                <div class="field">
                    <span class="label">Teléfono:</span>
                    <span class="value">{{cliente_telefono}}</span>
                </div>
            </div>
            
            <div class="section">
                <h3>Información de la Empresa</h3>
                <div class="field">
                    <span class="label">Nombre de la Empresa:</span>
                    <span class="value">{{empresa_nombre}}</span>
                </div>
                <div class="field">
                    <span class="label">RUT:</span>
                    <span class="value">{{empresa_rut}}</span>
                </div>
                <div class="field">
                    <span class="label">Giro:</span>
                    <span class="value">{{empresa_giro}}</span>
                </div>
                <div class="field">
                    <span class="label">Cantidad de Empleados:</span>
                    <span class="value">{{cantidad_empleados}}</span>
                </div>
            </div>
            
            <div class="section">
                <h3>Solicitud</h3>
                <div class="field">
                    <span class="label">Plan de Interés:</span>
                    <span class="value">{{plan_interes}}</span>
                </div>
                <div class="field">
                    <span class="label">Servicio Principal:</span>
                    <span class="value">{{servicio_principal}}</span>
                </div>
            </div>
            
            <div class="section">
                <h3>Mensaje Adicional</h3>
                <div class="field">
                    <span class="value">{{mensaje_cliente}}</span>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Fecha:</strong> {{fecha_envio}} a las {{hora_envio}}</p>
                <p>Este email fue generado automáticamente desde el formulario de Llanos Auditores</p>
            </div>
        </div>
    </div>
</body>
</html>
```

4. Copia el **Template ID** (ej: `template_xxxxx`)

#### 2.3 Public Key
1. Ve a **Account** → **API Keys**
2. Copia la **Public Key** (ej: `0rq3Zh-UPx-lMhF3a`)

### 3. Actualizar la Configuración en el Código

1. Abre el archivo `form-handler.js`
2. Busca la sección **CONFIGURACIÓN DE EMAIL.JS**
3. Reemplaza los valores:

```javascript
const EMAIL_CONFIG = {
    serviceId: "service_TU_SERVICE_ID",           // Reemplaza con tu Service ID
    templateId: "template_TU_TEMPLATE_ID",        // Reemplaza con tu Template ID
    publicKey: "TU_PUBLIC_KEY",                   // Reemplaza con tu Public Key
    recipientEmail: "job.llanos@gmail.com"        // Este puede quedar igual
};
```

**Ejemplo:**
```javascript
const EMAIL_CONFIG = {
    serviceId: "service_abc123def456",
    templateId: "template_xyz789abc123",
    publicKey: "0rq3Zh-UPx-lMhF3a",
    recipientEmail: "job.llanos@gmail.com"
};
```

### 4. Hacer Push a GitHub

```bash
cd C:\github\formulario\LlanosAuditores
git add form-handler.js
git commit -m "Update EmailJS configuration"
git push origin main gh-pages
```

## Funcionalidades de la Página de Formulario

### Campos del Formulario:
- ✅ Nombre del cliente *
- ✅ Email del cliente *
- ✅ Teléfono *
- ✅ Nombre de la empresa *
- ✅ RUT de la empresa
- ✅ Giro de la empresa
- ✅ Plan de interés *
- ✅ Cantidad de empleados
- ✅ Servicio principal *
- ✅ Mensaje adicional
- ✅ Aceptación de términos *

### Características Principales:
1. **Validación de campos**: Todos los campos obligatorios deben ser completados
2. **Mensajes de éxito/error**: Retroalimentación clara al usuario
3. **Interfaz moderna**: Diseño consistente con el sitio principal
4. **Responsiva**: Compatible con móviles y escritorio
5. **Seguridad**: Los datos no se almacenan en el servidor (EmailJS maneja todo)

## Cómo Reutilizar en Otras Páginas

### Opción 1: Crear un formulario independiente
1. Crea un nuevo archivo HTML
2. Copia la estructura del formulario desde `form-handler.html`
3. Importa el script: `<script src="form-handler.js"></script>`
4. Personaliza los campos según necesites

### Opción 2: Incrustar el formulario en otra página
```html
<!-- En tu página -->
<div id="formulario-contacto"></div>

<!-- Al final del body -->
<script src="form-handler.js"></script>
<script>
    // Cargar formulario dinámicamente si lo necesitas
</script>
```

## Solución de Problemas

### El email no se envía:
1. Verifica que EmailJS esté inicializado correctamente
2. Comprueba que los IDs de servicio, template y public key sean correctos
3. Abre la consola del navegador (F12) para ver errores
4. Verifica que el servicio de email esté conectado en EmailJS

### Los datos no se muestran correctamente:
1. Asegúrate de que los nombres de variables en la plantilla coincidan con los del código
2. Revisa que el HTML de la plantilla sea válido

### El formulario se envía pero no llega al email:
1. Verifica la carpeta de spam/correo no deseado
2. Comprueba que el servicio de email esté activo en EmailJS
3. Revisa los límites de EmailJS (versión gratuita: 200 emails/mes)

## Información Adicional

- **Límites de EmailJS (Plan Gratuito)**: 200 emails por mes
- **Documentación**: https://www.emailjs.com/docs/
- **Soporte**: https://www.emailjs.com/docs/faq/

## URL de la Página de Cotización

Una vez desplegado en GitHub Pages, la página estará disponible en:
```
https://trimpulso.github.io/LlanosAuditores/form-handler.html
```

---

**Notas importantes:**
- Asegúrate de reemplazar los valores de configuración antes de usar en producción
- Los datos se envían directamente desde el navegador del usuario a EmailJS
- No requiere un servidor backend
