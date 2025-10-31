import React, { useState } from 'react'
import { LogIn, UserPlus, ShoppingCart, Package, Shield, TrendingUp } from 'lucide-react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function SistemaAutenticacion({ onLoginSuccess }) {
  const [vista, setVista] = useState('login')

  const handleLogin = (datos) => {
    onLoginSuccess?.(datos)
  }

  const handleRegister = (datos) => {
    onLoginSuccess?.(datos)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #C8A2C8 0%, #8A2BE2 100%)',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        maxWidth: '900px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {/* Panel lateral morado */}
        <div style={{
          background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1DB2 100%)',
          padding: '40px 30px',
          color: 'white',
          flex: '1',
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '16px',
            fontWeight: '800',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            SKY
          </h1>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '30px',
            opacity: '0.95',
            fontFamily: 'Montserrat, sans-serif'
          }}>
            Accede a tu cuenta o crea una para adquirir los mejores productos del mercado.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: <ShoppingCart size={20} />, text: 'Carrito de compras' },
              { icon: <Package size={20} />, text: 'Gestión de productos' },
              { icon: <TrendingUp size={20} />, text: 'Análisis de ventas' },
              { icon: <Shield size={20} />, text: 'Seguridad garantizada' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </div>
                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de formularios */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          {/* Pestañas */}
          <div style={{
            display: 'flex',
            gap: '8px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '4px',
            margin: '30px 30px 0 30px'
          }}>
            <button
              type="button"
              onClick={() => setVista('login')}
              style={{
                flex: 1,
                padding: '12px 20px',
                border: 'none',
                background: vista === 'login' ? 'white' : 'transparent',
                color: vista === 'login' ? '#8A2BE2' : '#666',
                fontWeight: '600',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: vista === 'login' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'Montserrat, sans-serif'
              }}
              onMouseEnter={e => {
                if (vista !== 'login') e.currentTarget.style.color = '#8A2BE2'
              }}
              onMouseLeave={e => {
                if (vista !== 'login') e.currentTarget.style.color = '#666'
              }}
            >
              <LogIn size={18} />
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setVista('registro')}
              style={{
                flex: 1,
                padding: '12px 20px',
                border: 'none',
                background: vista === 'registro' ? 'white' : 'transparent',
                color: vista === 'registro' ? '#8A2BE2' : '#666',
                fontWeight: '600',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: vista === 'registro' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'Montserrat, sans-serif'
              }}
              onMouseEnter={e => {
                if (vista !== 'registro') e.currentTarget.style.color = '#8A2BE2'
              }}
              onMouseLeave={e => {
                if (vista !== 'registro') e.currentTarget.style.color = '#666'
              }}
            >
              <UserPlus size={18} />
              Registro
            </button>
          </div>

          {/* Formularios */}
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
      </div>
    </div>
  )
}