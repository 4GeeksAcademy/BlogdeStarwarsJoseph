# Instrucciones para agentes AI — BlogdeStarwarsJoseph

Propósito: facilitar que un agente AI sea productivo rápidamente en este repositorio Vite + React (plantilla de blog estilo Star Wars).

**Project Overview**
- Tipo: Single Page App multi-ruta con Vite + React + React Router v6.
- Entrada: [src/main.jsx](src/main.jsx#L1-L40) — registra `StoreProvider` y `RouterProvider`.
- Rutas: [src/routes.jsx](src/routes.jsx#L1-L60) — usa `createBrowserRouter` y rutas anidadas; ruta dinámica `/single/:theId`.
- Estado global: patrón `useReducer` + Context en [src/hooks/useGlobalReducer.jsx](src/hooks/useGlobalReducer.jsx#L1-L60). El `store` y `dispatch` se consumen vía el hook por defecto.
- Definición del store/reducer: [src/store.js](src/store.js) — se espera que exporte `default` (reducer) y `initialStore` (o una función que devuelva el estado inicial). Actualmente el archivo está incompleto/placeholder; proceder con cuidado.

**Comandos importantes (exactos)**
- Instalar dependencias: `npm install`
- Desarrollo / live-reload: `npm run dev` o `npm run start`
- Build: `npm run build`
- Previsualizar build: `npm run preview`
- Lint: `npm run lint`
- Requisito Node: `node >= 20` (ver `package.json` engines)

**Patrones y convenciones específicas del proyecto**
- Estructura: `src/pages/*` contienen vistas (Home, Layout, Single, Demo). Vistas se conectan desde `routes.jsx`.
- Componentes reutilizables en `src/components/` (ej. `Navbar.jsx`, `Footer.jsx`). Usa PascalCase para componentes.
- Estilo: CSS global en `src/index.css` importado por `src/main.jsx`.
- Firma esperada de `store.js`: el proyecto importa `storeReducer, { initialStore } from "../store"` en `useGlobalReducer.jsx`. Mantener esa firma evita romper el proveedor global.
- Uso del store: dispatch con objetos `{ type: 'SOME_ACTION', payload: ... }`. El hook predeterminado devuelve `{ dispatch, store }`.

**Integraciones y despliegue**
- Diseñado para deploy fácil en Vercel (ver `README.es.md`).
- No hay servicios externos obligatorios en el repo; data se suele mantener en el `store` o fetchearse desde componentes.

**Consejos prácticos para un agente que edite código aquí**
- Antes de cambiar `store.js`, ejecutar `npm run dev` localmente para verificar errores rápidos.
- Mantener la API pública del store: export default reducer y export named `initialStore` (o función equivalente) para compatibilidad con `useGlobalReducer.jsx`.
- Evitar cambiar la estructura de rutas sin actualizar `routes.jsx` y `src/pages` a la vez.
- Si introduces nuevas dependencias, actualiza `package.json` y documenta el motivo en un breve commit message.

**Ejemplos concretos en este repo**
- Punto de arranque y proveedor global: [src/main.jsx](src/main.jsx#L1-L40)
- Router y rutas: [src/routes.jsx](src/routes.jsx#L1-L60)
- Provider + hook: [src/hooks/useGlobalReducer.jsx](src/hooks/useGlobalReducer.jsx#L1-L60)
- Archivo a revisar/replicar estructura: [src/store.js](src/store.js#L1-L200)

**Qué no documentar aquí**
- No incluyas instrucciones de estilo general (esas ya están en `README.es.md`) a menos que sean específicas del flujo de trabajo técnico.

Si algo en estas instrucciones queda poco claro o quieres que incluya fragmentos de código de ejemplo (p. ej. una plantilla de `initialStore` y `storeReducer`) dímelo y lo añado. ¿Quieres que proponga un parche para arreglar `src/store.js` primero?
