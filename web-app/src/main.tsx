import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(container!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/**
 * ✅ TODO: Crear backend con node.js y express
 * TODO: Crear base de datos con postgresql
 * TODO: Instalar ORM y conectar con la base de datos
 * TODO: Crear endpoints para el juego
 * TODO: Crear modelos para el juego
 */
