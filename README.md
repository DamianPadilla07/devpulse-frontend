
---

### 📄 2. README para el Frontend (`task-manager-frontend`)

Crea un archivo llamado **`README.md`** dentro de la raíz de la carpeta `task-manager-frontend`:


<h1 align="center"> ⚡ DevPulse AI - Frontend Client (Angular) </h1>

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-EN%20PRODUCCION-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Angular-18+-red?style=for-the-badge&logo=angular" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/UI_Style-Dark_Theme-1e293b?style=for-the-badge" alt="Theme">
</p>

> Cliente de aplicación web **SPA (Single Page Application)** desarrollado con **Angular y TypeScript**, ofreciendo una interfaz moderna tipo Dashboard de Ingeniería con analítica de riesgos y consumo de API REST.

---
🧑‍💻 Autor: Damián Padilla 

## 📌 Índice
* [Descripción del Cliente](#-descripción-del-cliente)
* [Características Visuales y UX](#-características-visuales-y-ux)
* [Tecnologías Utilizadas](#-tecnologías-utilizadas)
* [Seguridad y Rutas Protegidas](#-seguridad-y-rutas-protegidas)
* [Instalación y Ejecución](#-instalación-y-ejecución)
* [Estructura del Proyecto](#-estructura-del-proyecto)
* [Autor](#-autor)

---

## 📝 Descripción del Cliente

**DevPulse AI Frontend** proporciona un panel de control interactivo donde los desarrolladores y líderes de equipo pueden gestionar el Backlog de un Sprint. Incorpora alertas visuales en tiempo real para la detección de **cuellos de botella** y comunicación asíncrona con el backend para solicitar asistencia diagnóstica a la IA.

---

## 🔨 Características Visuales y UX

- `📊 Dashboard de Métricas`: Tarjetas contadoras de tickets totales, pendientes, en progreso y completados.
- `⚠️ Detección de Cuellos de Botella`: Borde animado y badge de alerta parpadeante en tickets de prioridad alta no resueltos.
- `✨ Asistente IA Integrado`: Botón interactivo que renderiza diagnósticos de sprint generados por la IA.
- `🛡️ Guardia de Rutas (AuthGuard)`: Interceptación de navegación no autorizada hacia el Dashboard.
- `🎨 Diseño Dark Theme`: Interfaz estética optimizada para entornos de desarrollo de software.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** Angular 18+ (Standalone Components)
- **Lenguaje:** TypeScript
- **Estilos:** CSS3 / Flexbox & CSS Grid (Animaciones personalizadas)
- **Comunicación HTTP:** Angular `HttpClient` & `RxJS`
- **Manejo de Reactividad:** `ChangeDetectorRef` / `NgZone`

---

## 🔒 Seguridad y Rutas Protegidas

El archivo `auth-guard.ts` evalúa la persistencia del usuario en `localStorage` antes de permitir la navegación:

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Acceso permitido
  } else {
    router.navigate(['/login']); // Redirección automática
    return false;
  }
};

📁 Instalación y Ejecución
Navegar a la carpeta del proyecto:
cd task-manager-frontend

Instalar dependencias de Node:
npm install

Iniciar el servidor de desarrollo:
ng serve -o

La aplicación se abrirá automáticamente en http://localhost:4200.

