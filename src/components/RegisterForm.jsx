import React, { useState } from 'react'
import { User, Mail, Lock } from 'lucide-react'

export default function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({ nombre: '', correo: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // lógica de registro (temporal)
    console.log('Registrar', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={16} />
          <input className="w-full pl-10 border rounded py-2" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Correo</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
          <input className="w-full pl-10 border rounded py-2" value={formData.correo} onChange={e => setFormData({ ...formData, correo: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
          <input type="password" className="w-full pl-10 border rounded py-2" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
        </div>
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Registrar</button>
      <p className="text-center text-sm">¿Ya tienes cuenta? <button type="button" onClick={onSwitch} className="text-indigo-600 underline">Iniciar sesión</button></p>
    </form>
  )
}