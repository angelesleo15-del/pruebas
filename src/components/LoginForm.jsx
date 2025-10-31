import React, { useState } from 'react'
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'

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
      onLogin?.(formData)
    } else {
      setErrores(nuevosErrores)
    }
  }

  return (
    <div style={{ padding: '40px 30px' }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: '24px',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        Iniciar Sesión
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            color: '#555', 
            marginBottom: '8px',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Correo Electrónico
          </label>
          <div style={{ position: 'relative' }}>
            <Mail style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
              pointerEvents: 'none'
            }} size={18} />
            <input 
              type="email"
              style={{
                width: '100%',
                padding: '12px 12px 12px 42px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                fontFamily: 'Montserrat, sans-serif',
                outline: 'none'
              }}
              placeholder="tu@correo.com"
              value={formData.correo}
              onChange={e => {
                setFormData({ ...formData, correo: e.target.value })
                setErrores({ ...errores, correo: null })
              }}
              onFocus={e => {
                e.target.style.borderColor = '#8A2BE2'
                e.target.style.boxShadow = '0 0 0 3px rgba(138, 43, 226, 0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
          {errores.correo && (
            <div style={{
              padding: '14px 18px',
              borderRadius: '8px',
              marginTop: '8px',
              fontWeight: '500',
              backgroundColor: '#fee',
              color: '#c33',
              border: '1px solid #fcc',
              fontSize: '0.9rem',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              {errores.correo}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            color: '#555', 
            marginBottom: '8px',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Contraseña
          </label>
          <div style={{ position: 'relative' }}>
            <Lock style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
              pointerEvents: 'none'
            }} size={18} />
            <input 
              type={mostrarPassword ? 'text' : 'password'}
              style={{
                width: '100%',
                padding: '12px 42px 12px 42px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s',
                fontFamily: 'Montserrat, sans-serif',
                outline: 'none'
              }}
              placeholder="••••••••"
              value={formData.password}
              onChange={e => {
                setFormData({ ...formData, password: e.target.value })
                setErrores({ ...errores, password: null })
              }}
              onFocus={e => {
                e.target.style.borderColor = '#8A2BE2'
                e.target.style.boxShadow = '0 0 0 3px rgba(138, 43, 226, 0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#999',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#8A2BE2'}
              onMouseLeave={e => e.currentTarget.style.color = '#999'}
            >
              {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errores.password && (
            <div style={{
              padding: '14px 18px',
              borderRadius: '8px',
              marginTop: '8px',
              fontWeight: '500',
              backgroundColor: '#fee',
              color: '#c33',
              border: '1px solid #fcc',
              fontSize: '0.9rem',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              {errores.password}
            </div>
          )}
        </div>

        <button 
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1DB2 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            width: '100%',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'Montserrat, sans-serif'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #7520d0 0%, #5a189a 100%)'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(138, 43, 226, 0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #8A2BE2 0%, #6A1DB2 100%)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <LogIn size={20} />
          Iniciar Sesión
        </button>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '16px', 
          fontSize: '0.9rem', 
          color: '#666',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          ¿No tienes cuenta?{' '}
          <button 
            type="button" 
            onClick={onSwitch}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#8A2BE2', 
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </form>
    </div>
  )
}