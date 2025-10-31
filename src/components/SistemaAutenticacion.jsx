import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import CarritoCompras from './CarritoCompras'
import Modal from './Modal'
import { LogIn, UserPlus, ShoppingCart } from 'lucide-react'

export default function SistemaAutenticacion() {
  const [vista, setVista] = useState('login') // 'login' | 'registro' | 'carrito'
  const [showModal, setShowModal] = useState(false)
  const [usuarioActual, setUsuarioActual] = useState(null)

  const handleLogin = (datos) => {
    setUsuarioActual(datos)
    setVista('carrito')
  }

  const handleRegister = (datos) => {
    setUsuarioActual(datos)
    setVista('carrito')
  }

  if (vista === 'carrito' && usuarioActual) {
    return (
      <div>
        <div className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Bienvenido, {usuarioActual.nombre || usuarioActual.correo}</h1>
            <button
              onClick={() => {
                setVista('login')
                setUsuarioActual(null)
              }}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        <CarritoCompras />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header con tabs */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center mb-6">
              Mi Tienda Online
            </h1>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setVista('login')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  vista === 'login'
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'bg-indigo-500 text-white hover:bg-indigo-400'
                }`}
              >
                <LogIn size={20} />
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => setVista('registro')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  vista === 'registro'
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'bg-indigo-500 text-white hover:bg-indigo-400'
                }`}
              >
                <UserPlus size={20} />
                Registro
              </button>
            </div>
          </div>

          {/* Contenido del formulario */}
          <div className="p-8">
            {vista === 'login' ? (
              <LoginForm 
                onSwitch={() => setVista('registro')} 
                onLogin={handleLogin}
              />
            ) : (
              <RegisterForm 
                onSwitch={() => setVista('login')}
                onRegister={handleRegister}
              />
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ¿Necesitas ayuda?
            </button>
          </div>
        </div>

        {/* Botón demo para ir directo al carrito */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setUsuarioActual({ nombre: 'Usuario Demo', correo: 'demo@tienda.com' })
              setVista('carrito')
            }}
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            <ShoppingCart size={20} />
            Ir directamente a la tienda (Demo)
          </button>
        </div>
      </div>

      {/* Modal de ayuda */}
      {showModal && (
        <Modal 
          titulo="Ayuda y Soporte" 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Bienvenido a nuestra tienda online. Aquí puedes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Crear una cuenta nueva</li>
              <li>Iniciar sesión con tu cuenta</li>
              <li>Explorar productos</li>
              <li>Agregar productos al carrito</li>
              <li>Aplicar cupones de descuento</li>
              <li>Realizar compras seguras</li>
            </ul>
            <div className="bg-indigo-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-indigo-800 font-semibold">
                💡 Cupones disponibles:
              </p>
              <ul className="text-sm text-indigo-700 mt-2 space-y-1">
                <li>• DESCUENTO10 - 10% en compras sobre $500,000</li>
                <li>• DESCUENTO20 - 20% en compras sobre $1,000,000</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}