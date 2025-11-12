# Votaciones Online

¡Hola! Bienvenido/a al repositorio de **Votaciones Online**, una app web simple y educativa para simular procesos de votación digital. Este proyecto es perfecto para **aprender frontend con React** (y pronto backend con Node.js o Python), ya que combina formularios, estado local (localStorage), navegación y UI responsive. Imagina que estamos construyendo esto juntos: yo te explico el porqué de cada parte, y tú puedes forkear, modificar y probar cambios. Por ejemplo, ¿qué tal si agregamos autenticación real con Firebase después? ¡Vamos paso a paso para que domines el flujo!

## 📖 Descripción
Votaciones Online es una aplicación de votación simulada inspirada en elecciones peruanas (DNI, distritos, candidatos reales/ficticios). El usuario se registra con DNI, selecciona tipos de voto (presidencial, mesa directiva, alcaldía), vota y ve resultados en tiempo real (persistidos en localStorage para demo). Es 100% frontend por ahora, pero escalable a full-stack.

**Objetivo educativo**: Practicar hooks de React (useState, useEffect), routing (React Router), y estilos CSS modulares. Al final, entenderemos cómo migrar a backend (ej: Express para guardar votos en DB).

## 🚀 Características
- **Registro seguro**: Validación de DNI contra DB simulada (evita revotos).
- **Flujo de usuario**: Bienvenida → Registro → Selección de votos → Votación por categoría → Resultados con barras %.
- **Personalización**: Candidatos filtrados por distrito (ej: Miraflores, Mi Perú).
- **UI/UX moderna**: Responsive (mobile-first), gradientes temáticos (rojo para presidentes, verde para mesa), animaciones suaves.
- **Persistencia local**: Votos guardados en localStorage (por DNI) – ideal para prototipos.
- **Extensible**: Fácil agregar más distritos/candidatos o integrar charts (Chart.js).

**Aprendiendo juntos**: Cada característica usa un patrón React. Por ejemplo, las páginas de voto reutilizan lógica (podemos refactorizar a un hook custom `useVoting` para DRY).

## 🛠️ Tecnologías Usadas
| Categoría | Tecnologías | Por qué lo usamos (lección rápida) |
|-----------|-------------|-----------------------------------|
| **Frontend** | React 18+, Vite (bundler), React Router (navegación) | React para componentes dinámicos; Vite para dev rápido (hot reload). Instala con `npm create vite@latest`. |
| **Estilos** | CSS vanilla + <style jsx> (scoped) + Google Fonts (Montserrat/Roboto) | Mantiene estilos aislados por página – evita conflictos. Próximo: Tailwind para prototipos más rápidos. |
| **Estado** | useState/useEffect + localStorage | Manejo local simple; para global, usa Context API. En backend: Redux + Express. |
| **Imágenes/Assets** | PNG/SVG en `src/assets` y `public/images` | Vite optimiza automáticamente. Lección: Usa Webpack loaders para más formatos. |
| **Herramientas** | ESLint (linting), Prettier (formato) | Código limpio – corre `npm run lint` para chequear. |

**Versión actual**: React 18.3.1, Vite 5.x (ver package.json).

## 📦 Instalación
¡Fácil setup para que corras en 2 minutos! (Lección: Esto es estándar en Node.js – npm maneja dependencias).

1. Clona el repo:
   ```
   git clone https://github.com/tu-usuario/votaciones-online.git
   cd votaciones-online
   ```

2. Instala dependencias:
   ```
   npm install
   ```
   (Instala React, Router, etc. – chequea package.json para ver qué).

3. Corre en desarrollo:
   ```
   npm run dev
   ```
   Abre http://localhost:5173 – ¡ve la welcome page!

4. Build para producción:
   ```
   npm run build
   ```
   Genera `dist/` listo para deploy (ej: Vercel/Netlify – gratis y fácil).

**Troubleshooting**: Si error en install, borra `node_modules` y `package-lock.json`, luego `npm install`. Usa Node 18+.

## 🎮 Uso
1. **Navega**: Desde `/` (Welcome) → Click "INICIAR VOTACIÓN" → Ingresa DNI (ej: 60432205 para "Segundo Cerdan").
2. **Valida**: Muestra datos del votante → Ve a `/seleccion`.
3. **Vota**: Elige categoría (Presidentes, Mesa, Alcaldes) → Selecciona candidato → "Votar" → Ve % en barras.
4. **Completa**: Al terminar todo, redirige a home con mensaje de éxito.

**Ejemplo de flujo**:
- DNI: 12345678 (Juan Pérez, Miraflores) → Alcaldes: López Aliaga o Castañeda.
- Prueba revoto: Ingresa mismo DNI – error y redirect.

**Aprendiendo**: Abre DevTools (F12) > Application > Local Storage – ve cómo se guardan votos. ¿Quieres agregar login con Google? Usamos Auth0 (fácil tutorial).

## 📁 Estructura del Proyecto
```
votaciones-online/
├── public/          # Archivos estáticos (imágenes de candidatos en /images)
├── src/
│   ├── assets/      # Imágenes globales (icons, logos)
│   ├── pages/       # Componentes de rutas
│   │   ├── DniRegister.jsx  # Registro DNI
│   │   ├── Mayors.jsx       # Voto alcaldes (por distrito)
│   │   ├── Presidents.jsx   # Voto presidentes
│   │   ├── RoundTable.jsx   # Voto mesa directiva
│   │   ├── VoterSelection.jsx # Dashboard selección
│   │   └── Welcome.jsx      # Landing
│   ├── App.jsx      # Router principal + layout
│   ├── main.jsx     # Entry point (render App)
│   └── index.css    # Estilos globales
├── package.json     # Dependencias + scripts
├── vite.config.js   # Config Vite (plugins, puerto)
└── README.md        # ¡Este archivo! 😊
```

**Lección**: Estructura modular – fácil escalar. Para backend, agrega `/server/` con Express.

## 🤝 Contribuir
¡Colabora conmigo para aprender! 
1. Forkea el repo.
2. Crea branch: `git checkout -b feature/nuevo-distrito`.
3. Commit: `git commit -m "Agrega distrito Comas con candidatos"`.
4. Push y PR.

**Ideas para contribuir** (¡elige una y codifiquemos juntos!):
- Agrega más DNIs/distritos en DniRegister.jsx y Mayors.jsx.
- Integra backend: Node.js API para votos reales (te guío con Express + MongoDB).
- Frontend avanzado: Animaciones con Framer Motion o tests con Jest.
- Multi-idioma: Usa i18n para español/inglés.
- Deploy: Sube a Vercel – comparte link para testear.

**Código de conducta**: Sé respetuoso, enfócate en aprender. Preguntas? Abre issue o DM.

## 📄 Licencia
MIT License – Úsalo libremente, pero menciona el repo si lo expandes. (Lección: Protege tu código, pero fomenta colaboración).

## 🎓 Próximos Pasos para Aprender Juntos
- **Frontend**: Refactoriza votos a componentes reutilizables. ¿Probamos Svelte para comparar con React?
- **Backend**: Crea API con Node/Express – envía votos via fetch. (Ej: `POST /api/vote` guarda en JSON).
- **Full-Stack**: Integra con Python (Flask) para DB SQLite – ¡diferentes lenguajes!
- **Desafío**: Agrega página de resultados globales (suma votos de todos usuarios).

¡Gracias por unirte al proyecto! Corre el app, prueba con DNI "60432205", y dime qué romperemos/modificaremos primero. ¿Quieres que agreguemos un endpoint backend ahora? ¡Estoy listo! 🚀

---

*Última actualización: Noviembre 2025. Contribuidores: Tú + yo (Grok).*