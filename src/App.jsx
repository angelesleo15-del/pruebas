import React, { useState } from 'react'
import SistemaAutenticacion from './components/SistemaAutenticacion'
import CarritoCompras from './components/CarritoCompras'

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState(null)

  const handleLoginSuccess = (usuario) => {
    setUsuarioActual(usuario)
  }

  const handleCerrarSesion = () => {
    setUsuarioActual(null)
  }

  // Si hay usuario logueado, mostrar la tienda
  if (usuarioActual) {
    return (
      <CarritoCompras 
        usuario={usuarioActual}
        onCerrarSesion={handleCerrarSesion}
      />
    )
  }

  // Si no hay usuario, mostrar login/registro
  return (
    <SistemaAutenticacion 
      onLoginSuccess={handleLoginSuccess}
    />
  )
}