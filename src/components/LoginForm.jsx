import React, { useState } from 'react'
import { Lock, Mail } from 'lucide-react'

export default function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ correo: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // lógica de login
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>Correo</label>
      <div className="relative">
        <Mail className="absolute left-3 top-3" size={18} />
        <input value={formData.correo} onChange={e => setFormData({ ...formData, correo: e.target.value })} />
      </div>

      <label>Contraseña</label>
      <div className="relative">
        <Lock className="absolute left-3 top-3" size={18} />
        <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
      </div>

      <button type="submit">Entrar</button>
      <p>¿No tienes cuenta? <button type="button" onClick={onSwitch}>Regístrate</button></p>
    </form>
  )
}