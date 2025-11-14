/**
 * Form Handler - Gestor de Formularios con EmailJS
 * Permite enviar los datos del formulario al correo: job.llanos@gmail.com
 * 
 * Este módulo puede ser fácilmente exportado a otras páginas
 */

// ==========================================
// CONFIGURACIÓN DE EMAIL.JS
// ==========================================
// Para usar este servicio, necesitas:
// 1. Crear una cuenta en https://www.emailjs.com
// 2. Reemplazar "YOUR_SERVICE_ID" con tu Service ID
// 3. Reemplazar "YOUR_TEMPLATE_ID" con tu Template ID
// 4. Reemplazar "YOUR_PUBLIC_KEY" con tu Public Key

const EMAIL_CONFIG = {
    serviceId: "service_qin2chu",          // Tu Service ID de Gmail
    templateId: "template_cotizacion",     // Tu Template ID
    publicKey: "Uj_crn3Kt1Gl6rP",         // Tu Public Key
    recipientEmail: "job.llanos@gmail.com" // Email destino
};

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init(EMAIL_CONFIG.publicKey);
    
    // Obtener referencias del DOM
    const form = document.getElementById('cotizacionForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    // Agregar evento al formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Ocultar mensajes previos
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Deshabilitar botón
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Recopilar datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            empresa: document.getElementById('empresa').value,
            rut: document.getElementById('rut').value || 'No especificado',
            giro: document.getElementById('giro').value || 'No especificado',
            plan: document.getElementById('plan').value,
            empleados: document.getElementById('empleados').value || 'No especificado',
            servicio: document.getElementById('servicio').value,
            mensaje: document.getElementById('mensaje').value || 'Sin mensaje adicional',
            fechaEnvio: new Date().toLocaleDateString('es-CL'),
            horaEnvio: new Date().toLocaleTimeString('es-CL')
        };
        
        // Crear objeto de plantilla para EmailJS
        const templateParams = {
            to_email: EMAIL_CONFIG.recipientEmail,
            from_email: formData.email,
            from_name: formData.nombre,
            subject: `Nueva Cotización: ${formData.empresa}`,
            
            // Variables personalizadas para tu plantilla
            cliente_nombre: formData.nombre,
            cliente_email: formData.email,
            cliente_telefono: formData.telefono,
            empresa_nombre: formData.empresa,
            empresa_rut: formData.rut,
            empresa_giro: formData.giro,
            plan_interes: formData.plan,
            cantidad_empleados: formData.empleados,
            servicio_principal: formData.servicio,
            mensaje_cliente: formData.mensaje,
            fecha_envio: formData.fechaEnvio,
            hora_envio: formData.horaEnvio,
            
            // Mensaje formateado para el email
            mensaje_html: formatearMensajeHtml(formData)
        };
        
        // Enviar email usando EmailJS
        emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams)
            .then(function(response) {
                console.log('Éxito:', response);
                
                // Mostrar mensaje de éxito
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Limpiar formulario
                form.reset();
                
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Ocultar mensaje de éxito después de 5 segundos
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
                
            }, function(error) {
                console.error('Error:', error);
                
                // Mostrar mensaje de error
                let errorMsg = 'Hubo un error al enviar el formulario. Por favor, intenta de nuevo.';
                
                if (error.status === 400) {
                    errorMsg = 'Error de configuración. Por favor, contacta al administrador.';
                } else if (error.status === 404) {
                    errorMsg = 'Error de configuración del servidor. Por favor, intenta más tarde.';
                } else if (error.status === 422) {
                    errorMsg = 'Datos inválidos. Por favor, revisa los campos.';
                }
                
                errorText.textContent = errorMsg;
                errorMessage.style.display = 'block';
                errorMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Ocultar mensaje de error después de 10 segundos
                setTimeout(function() {
                    errorMessage.style.display = 'none';
                }, 10000);
            });
    });
});

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

/**
 * Formatea los datos del formulario en un mensaje HTML legible
 * @param {Object} data - Datos del formulario
 * @returns {string} HTML formateado
 */
function formatearMensajeHtml(data) {
    const planLabels = {
        'emprende': 'Plan Emprende',
        'microempresa': 'Plan Microempresa',
        'pyme': 'Plan Pyme',
        'empresa': 'Plan Empresa',
        'personalizado': 'Plan Personalizado'
    };
    
    const servicioLabels = {
        'contable': 'Asesoría Contable',
        'tributaria': 'Asesoría Tributaria',
        'remuneraciones': 'Asesoría en Remuneraciones',
        'auditoria': 'Auditoría Estados Financieros',
        'otros': 'Otros Servicios'
    };
    
    return `
        <h3>Nueva Solicitud de Cotización</h3>
        <h4>Información del Cliente</h4>
        <p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(data.telefono)}</p>
        
        <h4>Información de la Empresa</h4>
        <p><strong>Nombre de la Empresa:</strong> ${escapeHtml(data.empresa)}</p>
        <p><strong>RUT:</strong> ${escapeHtml(data.rut)}</p>
        <p><strong>Giro:</strong> ${escapeHtml(data.giro)}</p>
        <p><strong>Cantidad de Empleados:</strong> ${escapeHtml(data.empleados)}</p>
        
        <h4>Solicitud</h4>
        <p><strong>Plan de Interés:</strong> ${planLabels[data.plan] || data.plan}</p>
        <p><strong>Servicio Principal:</strong> ${servicioLabels[data.servicio] || data.servicio}</p>
        
        <h4>Mensaje Adicional</h4>
        <p>${escapeHtml(data.mensaje)}</p>
        
        <hr>
        <p><small><strong>Fecha de Envío:</strong> ${data.fechaEnvio} a las ${data.horaEnvio}</small></p>
    `;
}

/**
 * Escapa caracteres HTML para evitar inyección
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Obtener nombre legible para un plan
 * @param {string} planCode - Código del plan
 * @returns {string} Nombre del plan
 */
function obtenerNombrePlan(planCode) {
    const planes = {
        'emprende': 'Plan Emprende',
        'microempresa': 'Plan Microempresa',
        'pyme': 'Plan Pyme',
        'empresa': 'Plan Empresa',
        'personalizado': 'Plan Personalizado'
    };
    return planes[planCode] || planCode;
}

/**
 * Obtener nombre legible para un servicio
 * @param {string} servicioCode - Código del servicio
 * @returns {string} Nombre del servicio
 */
function obtenerNombreServicio(servicioCode) {
    const servicios = {
        'contable': 'Asesoría Contable',
        'tributaria': 'Asesoría Tributaria',
        'remuneraciones': 'Asesoría en Remuneraciones',
        'auditoria': 'Auditoría Estados Financieros',
        'otros': 'Otros Servicios'
    };
    return servicios[servicioCode] || servicioCode;
}

// ==========================================
// EXPORTAR FUNCIONES PARA REUTILIZACIÓN
// ==========================================
// Si necesitas usar este script en otra página, puedes hacer:
// 1. Copiar este archivo como form-handler.js
// 2. Importarlo en tu HTML: <script src="form-handler.js"></script>
// 3. Usar las funciones públicas si es necesario

window.FormHandler = {
    config: EMAIL_CONFIG,
    formatearMensaje: formatearMensajeHtml,
    obtenerNombrePlan: obtenerNombrePlan,
    obtenerNombreServicio: obtenerNombreServicio
};
