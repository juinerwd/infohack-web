import { sanitizeInput, validateEmail, validateName, validateMessage } from '../utils/validators';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

interface ContactFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

/**
 * Muestra un mensaje de error en el formulario
 */
function showError(message: string, statusElement: HTMLElement): void {
  statusElement.textContent = `❌ ${message}`;
  statusElement.classList.remove('text-green-600', 'text-yellow-600');
  statusElement.classList.add('text-red-600');
  statusElement.style.display = 'block';
}

/**
 * Muestra un mensaje de éxito en el formulario
 */
function showSuccess(message: string, statusElement: HTMLElement): void {
  statusElement.textContent = `✅ ${message}`;
  statusElement.classList.remove('text-red-600', 'text-yellow-600');
  statusElement.classList.add('text-green-600');
  statusElement.style.display = 'block';
}

/**
 * Muestra un mensaje de advertencia en el formulario
 */
function showWarning(message: string, statusElement: HTMLElement): void {
  statusElement.textContent = `⚠️ ${message}`;
  statusElement.classList.remove('text-green-600', 'text-red-600');
  statusElement.classList.add('text-yellow-600');
  statusElement.style.display = 'block';
}

/**
 * Valida todos los campos del formulario
 */
function validateForm(name: string, email: string, message: string): string | null {
  // Validar nombre
  if (!name || name.trim().length === 0) {
    return 'El nombre es obligatorio';
  }
  
  if (!validateName(name)) {
    return 'El nombre solo puede contener letras, espacios y guiones (2-50 caracteres)';
  }
  
  // Validar email
  if (!email || email.trim().length === 0) {
    return 'El email es obligatorio';
  }
  
  if (!validateEmail(email)) {
    return 'Por favor, introduce un email válido';
  }
  
  // Validar mensaje
  if (!message || message.trim().length === 0) {
    return 'El mensaje es obligatorio';
  }
  
  if (!validateMessage(message)) {
    return 'El mensaje debe tener entre 10 y 5000 caracteres';
  }
  
  return null; // Sin errores
}

export function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!(form instanceof HTMLFormElement) || !status) {
    console.error('Formulario o elemento de estado no encontrado');
    return;
  }

  const typedForm = form as ContactFormElement;
  
  // Referencias a los inputs para validación en tiempo real
  const nameInput = typedForm.elements.name;
  const emailInput = typedForm.elements.email;
  const messageInput = typedForm.elements.message;
  
  if (!nameInput || !emailInput || !messageInput) {
    console.error('No se pudieron encontrar todos los campos del formulario');
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Sanitizar inputs
    const name = sanitizeInput(nameInput.value);
    const email = sanitizeInput(emailInput.value);
    const message = sanitizeInput(messageInput.value);

    // Validar formulario
    const validationError = validateForm(name, email, message);
    if (validationError) {
      showError(validationError, status);
      return;
    }

    // TODO: Implementar envío real cuando esté configurado el backend
    // Por ahora, mostrar mensaje de advertencia
    showWarning(
      'Por ahora este formulario no envía correos. Pronto estará habilitado.',
      status
    );

    // Limpiar formulario después de "envío"
    form.reset();

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      status.style.display = 'none';
    }, 5000);

    /* 
    // Código para cuando esté listo el backend:
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('¡Mensaje enviado correctamente! Te responderemos pronto.', status);
        form.reset();
      } else {
        showError(data.error || 'Error al enviar el mensaje', status);
      }
    } catch (error) {
      console.error('Error:', error);
      showError('Error de conexión. Por favor, intenta más tarde.', status);
    }
    */
  });

  // Validación en tiempo real (opcional)
  nameInput.addEventListener('blur', () => {
    const name = sanitizeInput(nameInput.value);
    if (name && !validateName(name)) {
      showError('Nombre inválido', status);
    }
  });

  emailInput.addEventListener('blur', () => {
    const email = sanitizeInput(emailInput.value);
    if (email && !validateEmail(email)) {
      showError('Email inválido', status);
    }
  });
}

