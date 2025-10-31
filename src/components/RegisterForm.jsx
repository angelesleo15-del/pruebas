import React, { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function RegisterForm({ onSwitch, onRegister }) {
  const [formData, setFormData] = useState({ 
    nombre: '', 
    correo: '', 
    password: '',
    confirmarPassword: '' 
  })
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)
  const [errores, setErrores] = useState({})

  const validarFormulario = () => {
    const nuevosErrores = {}
    
    if (!formData.nombre) {
      nuevosErrores.nombre = 'El nombre es requerido'
    } else if (formData.nombre.length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres'
    }
    
    if (!formData.correo) {
      nuevosErrores.correo = 'El correo es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      nuevosErrores.correo = 'El correo no es válido'
    }
    
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    
    if (!formData.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Debes confirmar la contraseña'
    } else if (formData.password !== formData.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden'
    }
    
    return nuevosErrores
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validarFormulario()
    
    if (Object.keys(nuevosErrores).length === 0) {
      console.log('Registro exitoso:', formData)
      onRegister?.(formData)
    } else {
      setErrores(nuevosErrores)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre Completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errores.nombre 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
            }`}
            placeholder="Juan Pérez"
            value={formData.nombre} 
            onChange={e => {
              setFormData({ ...formData, nombre: e.target.value })
              setErrores({ ...errores, nombre: null })
            }}
          />
        </div>
        {errores.nombre && (
          <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Correo Electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="email"
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errores.correo 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
            }`}
            placeholder="tu@correo.com"
            value={formData.correo} 
            onChange={e => {
              setFormData({ ...formData, correo: e.target.value })
              setErrores({ ...errores, correo: null })
            }}
          />
        </div>
        {errores.correo && (
          <p className="text-red-500 text-sm mt-1">{errores.correo}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type={mostrarPassword ? 'text' : 'password'}
            className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errores.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
            }`}
            placeholder="••••••••"
            value={formData.password} 
            onChange={e => {
              setFormData({ ...formData, password: e.target.value })
              setErrores({ ...errores, password: null })
            }}
          />
          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errores.password && (
          <p className="text-red-500 text-sm mt-1">{errores.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirmar Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type={mostrarConfirmar ? 'text' : 'password'}
            className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errores.confirmarPassword 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
            }`}
            placeholder="••••••••"
            value={formData.confirmarPassword} 
            onChange={e => {
              setFormData({ ...formData, confirmarPassword: e.target.value })
              setErrores({ ...errores, confirmarPassword: null })
            }}
          />
          <button
            type="button"
            onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {mostrarConfirmar ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errores.confirmarPassword && (
          <p className="text-red-500 text-sm mt-1">{errores.confirmarPassword}</p>
        )}
      </div>

      <button 
        type="submit" 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
      >
        Crear Cuenta
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <button 
          type="button" 
          onClick={onSwitch} 
          className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
        >
          Inicia sesión aquí
        </button>
      </p>
    </form>
  )
}