import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import CarritoCompras from './CarritoCompras'
import Modal from './Modal'

export default function SistemaAutenticacion() {
  const [vista, setVista] = useState('login') // 'login' | 'registro' | 'carrito'
  const [showModal, setShowModal] = useState(false)


  console.log('SistemaAutenticacion render — vista:', vista)

  if (vista === 'carrito') return <CarritoCompras />

  return (
    <div className="auth-container">
      <div className="tabs">
        <button type="button" onClick={() => setVista('login')}>Iniciar</button>
        <button type="button" onClick={() => setVista('registro')}>Registro</button>
        <button type="button" onClick={() => setShowModal(true)}>Abrir modal</button>
        <button
          type="button"
          onClick={() => {
            console.log('click abrir carrito')
            setVista('carrito')
          }}
        >
          Abrir carrito
        </button>
      </div>

      {vista === 'login' ? (
        <LoginForm onSwitch={() => setVista('registro')} />
      ) : (
        <RegisterForm onSwitch={() => setVista('login')} />
      )}

      {showModal && <Modal onClose={() => setShowModal(false)}>{/* contenido */}</Modal>}
    </div>
  )
}
