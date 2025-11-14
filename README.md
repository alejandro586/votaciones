# Votaciones Online - Sistema Electoral Digital

¡**Bienvenido al repositorio de Votaciones Online!** 🚀  

Esta es una **aplicación web completa** para simular votaciones digitales, diseñada para **aprender full-stack development** con **React (frontend)** y **Node.js (backend)**. El proyecto incluye **autenticación, roles de usuario, paneles administrativos, y gráficos en tiempo real**. Imagina que estamos construyendo esto juntos: yo te explico cada parte, y tú puedes forkear, modificar y expandir.

---

## 📖 Descripción

**Votaciones Online** es un sistema de votación digital inspirado en elecciones peruanas. El votante se registra con DNI, selecciona tipos de voto (presidencial, mesa directiva, municipal), vota y ve resultados en tiempo real. Los administradores tienen paneles separados para monitoreo y análisis.

**Objetivo educativo**: Practicar React Router, localStorage, Recharts, autenticación JWT, y APIs REST. Al final, entenderemos cómo migrar de frontend local a backend con MongoDB.

---

## 🎯 Características

### **Para Votantes**
- **Landing Page**: Bienvenida con noticias y botón iniciar
- **Registro DNI**: Validación contra base de datos simulada
- **Selección de Voto**: Dashboard con 3 tipos de elección
- **Votación Presidencial**: 4 candidatos con UI moderna
- **Votación Mesa Directiva**: 3 partidos políticos
- **Votación Municipal**: Candidatos por distrito
- **Prevención de Revoto**: localStorage por DNI
- **Resultados en Tiempo Real**: Barras de progreso y %

### **Para Administradores**
- **Login de Admin**: Usuario `admin` / Contraseña `12345`
- **Panel de Admin Normal**: Gráficos por distrito
- **Panel de SuperAdmin**: Dashboard completo con sidebar
- **Electores**: Lista de votantes que ya votaron
- **Votaciones**: Detalle por candidato y distrito
- **Reportes**: Exportar CSV con todos los resultados
- **Configuración**: Ajustar título, fecha, horarios
- **Entrenamiento IA**: Simulación con barra de progreso
- **Reset de Votos**: Eliminar todos los datos

### **Técnico**
- **Frontend**: React 19, Vite 7, Tailwind CSS 3, Recharts 3
- **Estado**: localStorage con estructura centralizada
- **Diseño**: Responsive, dark mode, gradientes, animaciones
- **Rutas**: React Router 7 con rutas protegidas
- **Roles**: Votante / Admin Normal / SuperAdmin

---

## 🛠️ Tecnologías

| Categoría | Tecnologías | Por qué lo usamos |
|-----------|-------------|-------------------|
| **Frontend** | React 19, Vite 7, React Router 7 | React para componentes dinámicos; Vite para desarrollo rápido |
| **Estilos** | Tailwind CSS 3, CSS-in-JS (styled-jsx) | Tailwind para prototipado rápido; CSS-in-JS para componentes |
| **Gráficos** | Recharts 3 | Charts modernos y responsive para datos electorales |
| **Estado** | localStorage, useState, useEffect | Persistencia simple; hooks para lógica reactiva |
| **Iconos** | Lucide React | Iconos SVG modernos y escalables |
| **Validación** | Regex, JSON.parse | Validación frontend básica |

---

## 📦 Instalación

### **Pre-requisitos**
- **Node.js** 18+ ([descargar](https://nodejs.org))
- **npm** o **yarn** (viene con Node)
- **Git** ([descargar](https://git-scm.com))

### **Paso a paso**

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/alejandro586/votaciones.git
   cd votaciones
   ```

2. **Instala dependencias**:
   ```bash
   npm install
   ```
   (Instala React, Router, Tailwind, Recharts, Lucide, etc.)

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre en el navegador**:
   ```
   http://localhost:5173
   ```

---

## 🚀 Uso

### **Como Votante**

1. **Inicia en la página principal** (`/`)
   - Ve el landing con noticias y botón "Iniciar Votación"

2. **Regístrate con DNI** (`/dni`)
   - Ingresa DNI: `12345678` (Juan Pérez, Miraflores)
   - O cualquier DNI de 8 dígitos

3. **Selecciona tipo de voto** (`/seleccion`)
   - Dashboard con 3 opciones: Presidentes, Mesa Directiva, Alcaldes
   - Botones deshabilitados si ya votaste

4. **Vota por categoría**:
   - **Presidentes** (`/presidentes`): Elige entre 4 candidatos
   - **Mesa Directiva** (`/mesa-redonda`): 3 partidos políticos
   - **Alcaldes** (`/alcaldes`): Candidatos de tu distrito

5. **Ve resultados**:
   - Barras de progreso con %
   - Mensaje "¡Voto registrado!"
   - Redirige a selección

### **Como Administrador**

1. **Acceso al panel** (`/admin/normal`)
   - Admin normal → Solo ve votos de SU distrito
   - Sin sidebar, solo gráficos y acciones

2. **Acceso al SuperAdmin** (`/admin/panel`)
   - Login: Usuario `admin` / Contraseña `12345`
   - Sidebar completo con 5 opciones
   - Dashboard con KPIs, gráficos en tiempo real
   - Electores, votaciones, reportes, configuración

### **Rutas Completas**

| URL | Página | Rol | Acceso |
|-----|--------|-----|--------|
| `/` | Welcome | Votante | Público |
| `/dni` | Registro DNI | Votante | Público |
| `/seleccion` | Selección Voto | Votante | Público |
| `/presidentes` | Voto Presidente | Votante | Público |
| `/mesa-redonda` | Voto Mesa | Votante | Público |
| `/alcaldes` | Voto Alcalde | Votante | Público |
| `/admin/normal` | Panel Admin | Admin Normal | Público |
| `/admin/panel` | SuperAdmin | SuperAdmin | Protegido |

---

## 📁 Estructura del Proyecto

```
votaciones-online/
├── public/
│   └── images/              # Imágenes de candidatos, logos
├── src/
│   ├── assets/
│   │   └── images/          # Assets locales
│   ├── pages/               # Páginas del votante
│   │   ├── Welcome.jsx      # Landing page
│   │   ├── DniRegister.jsx  # Registro DNI
│   │   ├── VoterSelection.jsx # Selección de voto
│   │   ├── Presidents.jsx   # Voto presidencial
│   │   ├── RoundTable.jsx   # Voto mesa directiva
│   │   └── Mayors.jsx       # Voto alcaldes
│   ├── pages/admin/         # Páginas de administración
│   │   ├── login.jsx        # Login admin
│   │   ├── panel_de_admin.jsx # Admin normal
│   │   ├── panel_de_superadmin.jsx # SuperAdmin
│   │   ├── electores.jsx    # Lista de votantes
│   │   ├── votaciones.jsx   # Detalle votaciones
│   │   ├── reportes.jsx     # Exportar CSV
│   │   └── configuracion.jsx # Ajustes sistema
│   ├── layouts/             # Layouts compartidos
│   │   ├── AdminLayout.jsx  # Layout con sidebar
│   │   └── ProtectedAdminRoute.jsx # Rutas protegidas
│   ├── utils/               # Utilidades
│   │   └── votacionUtils.js # Funciones de votación
│   ├── App.jsx              # Router principal
│   └── main.jsx             # Entry point
├── package.json             # Dependencias
├── tailwind.config.js       # Config Tailwind
├── postcss.config.js        # Config PostCSS
└── README.md                # ¡Este archivo!
```

---

## 🎮 Flujo de Usuario

### **Votante (Usuario Normal)**
```
Welcome (/) → DniRegister (/dni) → VoterSelection (/seleccion)
    ↓
[Presidentes → Mesa Redonda → Alcaldes] → Resultados → VoterSelection
```

### **Administrador**
```
Login Admin (/admin/login) → Panel Admin Normal (/admin/normal)
```

### **SuperAdministrador**
```
Login Admin → SuperAdmin Dashboard (/admin/panel) → [Sidebar: Electores, Votaciones, Reportes, Config]
```

---

## 🔧 Funcionalidades Técnicas

### **Sistema de Votos**
- **localStorage**: `votacionesGlobales` (datos centralizados)
- **Prevención revoto**: `*_voted_${dni}` (por usuario)
- **Tiempo real**: Event listener `storage` para actualizaciones
- **Distritos**: Filtrado por `userData.distrito`

### **Autenticación**
- **Votante**: DNI simple (sin contraseña)
- **Admin**: Usuario `admin` / Contraseña `12345`
- **Roles**: `isAdmin` en localStorage
- **Protección**: `ProtectedAdminRoute`

### **Gráficos**
- **Recharts**: Barras, donas, líneas
- **Tiempo real**: Actualización cada segundo
- **Responsive**: Adaptable a móvil/tablet

### **Exportación**
- **CSV**: Descarga completa de resultados
- **PDF**: Próximamente (jsPDF)

---

## 🤝 Contribuir

¡**Colabora conmigo para aprender juntos!**

### **Cómo contribuir**
1. **Forkea** el repositorio
2. **Crea branch**: `git checkout -b feature/nuevo-distrito`
3. **Commit**: `git commit -m "feat: agrega distrito Comas"`
4. **Push**: `git push origin feature/nuevo-distrito`
5. **Pull Request** en GitHub

### **Ideas para mejorar**
- **Backend**: Node.js + MongoDB + API REST
- **Autenticación**: JWT + login por email
- **Notificaciones**: WebSockets para tiempo real
- **Mobile**: PWA (Progressive Web App)
- **Tests**: Jest + React Testing Library
- **Multi-idioma**: i18n (español/inglés/quechua)

### **Código de Conducta**
Sé respetuoso, enfócate en aprender. Preguntas → Abre un **Issue** o **Discussion**.

---

## 📄 Licencia

**MIT License** – Úsalo libremente, pero menciona el repo original.

```
Copyright (c) 2025 Alejandro & Grok

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🎓 Próximos Pasos

### **Nivel Frontend**
- **Animaciones**: Framer Motion para transiciones
- **Tests**: Jest para probar componentes
- **PWA**: Service Worker para offline

### **Nivel Backend**
- **Node.js + Express**: API REST para votos
- **MongoDB**: Base de datos real
- **JWT**: Autenticación segura
- **WebSockets**: Actualizaciones en tiempo real

### **Nivel Full-Stack**
- **Docker**: Contenedores para desarrollo
- **CI/CD**: GitHub Actions
- **Deploy**: Vercel (frontend) + Railway (backend)

### **Nivel Pro**
- **Next.js**: Server-side rendering
- **GraphQL**: Alternativa a REST
- **Microservicios**: Python Flask + Node.js

---

## 📞 Contacto

- **GitHub**: [alejandro586](https://github.com/alejandro586)
- **Issues**: Abre en el repo
- **Discussions**: Para dudas generales

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Líneas de código** | ~2,500+ |
| **Componentes React** | 12+ |
| **Rutas definidas** | 14 |
| **Gráficos Recharts** | 5 tipos |
| **Roles de usuario** | 3 (Votante, Admin, SuperAdmin) |

---

**¡Gracias por usar Votaciones Online!**  
**Corre el proyecto, prueba con DNI `12345678`, y dime qué romperemos/modificaremos primero.**  
**¿Quieres backend ahora? ¡Estoy listo!** 🚀

---

*Última actualización: Noviembre 2025*  
*Contribuidores: Alejandro + Grok (xAI)*

---

### **Comandos Rápidos**

```bash
# Clonar y ejecutar
git clone https://github.com/alejandro586/votaciones.git
cd votaciones
npm install
npm run dev

# Para desarrollo
npm run lint          # Limpiar código
npm run build         # Build para producción
npm run preview       # Previsualizar build

# Para contribuir
git checkout -b feature/mi-feature
git add .
git commit -m "feat: mi nueva funcionalidad"
git push origin feature/mi-feature
```

**¡ERES UN DESARROLLADOR FULL-STACK PROFESIONAL!**  
**¡Ahora vamos por el backend con Node.js + MongoDB + JWT!**