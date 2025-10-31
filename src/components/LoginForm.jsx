import React, { useState } from 'react'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function LoginForm({ onSwitch, onLogin }) {
  const [formData, setFormData] = useState({ correo: '', password: '' })
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [errores, setErrores] = useState({})

  const validarFormulario = () => {
    const nuevosErrores = {}
    
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
    
    return nuevosErrores
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validarFormulario()
    
    if (Object.keys(nuevosErrores).length === 0) {
      // Simulación de login exitoso
      console.log('Login exitoso:', formData)
      onLogin?.(formData)
    } else {
      setErrores(nuevosErrores)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <button 
        type="submit" 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
      >
        Iniciar Sesión
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <button 
          type="button" 
          onClick={onSwitch} 
          className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
        >
          Regístrate aquí
        </button>
      </p>
    </form>
  )
}