import React, { useState } from 'react'
import { ShoppingCart, Package, User, LogOut } from 'lucide-react'
import ProductoCard from './ProductoCard'
import CarritoItem from './CarritoItem'
import ResumenCarrito from './ResumenCarrito'
import FormularioEnvio from './FormularioEnvio'

export default function CarritoCompras({ usuario, onCerrarSesion }) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Laptop HP', precio: 2500000, stock: 10, imagen: '💻', categoria: 'Electrónica' },
    { id: 2, nombre: 'Mouse Logitech', precio: 80000, stock: 25, imagen: '🖱️', categoria: 'Accesorios' },
    { id: 3, nombre: 'Teclado Mecánico', precio: 350000, stock: 15, imagen: '⌨️', categoria: 'Accesorios' },
    { id: 4, nombre: 'Monitor 27"', precio: 1200000, stock: 8, imagen: '🖥️', categoria: 'Electrónica' },
    { id: 5, nombre: 'Audífonos', precio: 250000, stock: 20, imagen: '🎧', categoria: 'Audio' },
    { id: 6, nombre: 'Webcam HD', precio: 180000, stock: 12, imagen: '📷', categoria: 'Accesorios' }
  ])

  const [carrito, setCarrito] = useState([])
  const [cupon, setCupon] = useState('')
  const [descuento, setDescuento] = useState(0)
  const [mensajes, setMensajes] = useState([])
  const [datosEnvio, setDatosEnvio] = useState({ 
    nombre: '', 
    direccion: '', 
    telefono: '', 
    email: '' 
  })

  const mostrarMensaje = (texto, tipo = 'success', duracion = 3000) => {
    const id = Date.now()
    setMensajes(m => [...m, { id, texto, tipo }])
    setTimeout(() => setMensajes(m => m.filter(x => x.id !== id)), duracion)
  }

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const p = productos.find(x => x.id === producto.id)
    if (!p) return mostrarMensaje('Producto no encontrado', 'error')
    
    const existente = carrito.find(i => i.id === producto.id)
    const totalSolicitado = (existente ? existente.cantidad : 0) + cantidad
    
    if (totalSolicitado > p.stock) {
      return mostrarMensaje('No hay suficiente stock disponible', 'error')
    }
    
    if (existente) {
      setCarrito(c => c.map(i => 
        i.id === producto.id 
          ? { ...i, cantidad: i.cantidad + cantidad } 
          : i
      ))
    } else {
      setCarrito(c => [...c, { 
        id: p.id, 
        nombre: p.nombre, 
        precio: p.precio, 
        cantidad 
      }])
    }
    
    mostrarMensaje(`${producto.nombre} agregado al carrito`, 'success')
  }

  const modificarCantidad = (id, nueva) => {
    if (nueva < 1) return eliminarDelCarrito(id)
    
    const p = productos.find(x => x.id === id)
    if (!p) return
    
    if (nueva > p.stock) {
      return mostrarMensaje(`Stock máximo: ${p.stock} unidades`, 'error')
    }
    
    setCarrito(c => c.map(i => i.id === id ? { ...i, cantidad: nueva } : i))
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(c => c.filter(i => i.id !== id))
    mostrarMensaje('Producto eliminado del carrito', 'success')
  }

  const calcularSubtotal = () => carrito.reduce((s, i) => s + i.precio * i.cantidad, 0)
  const calcularDescuento = () => Math.round((calcularSubtotal() * descuento) / 100)
  const calcularTotal = () => calcularSubtotal() - calcularDescuento()

  const aplicarCupon = () => {
    const code = cupon?.toUpperCase().trim()
    
    if (!code) {
      return mostrarMensaje('Ingresa un código de cupón', 'error')
    }
    
    if (code === 'DESCUENTO10') {
      if (calcularSubtotal() >= 500000) {
        setDescuento(10)
        mostrarMensaje('¡Cupón aplicado! 10% de descuento', 'success')
      } else {
        mostrarMensaje('El cupón requiere una compra mínima de $500,000', 'error')
      }
    } else if (code === 'DESCUENTO20') {
      if (calcularSubtotal() >= 1000000) {
        setDescuento(20)
        mostrarMensaje('¡Cupón aplicado! 20% de descuento', 'success')
      } else {
        mostrarMensaje('El cupón requiere una compra mínima de $1,000,000', 'error')
      }
    } else {
      mostrarMensaje('Cupón inválido', 'error')
    }
  }

  const validarDatosEnvio = () => {
    const { nombre, direccion, telefono, email } = datosEnvio
    
    if (!nombre || !direccion || !telefono || !email) {
      mostrarMensaje('Por favor completa todos los datos de envío', 'error')
      return false
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      mostrarMensaje('El email no es válido', 'error')
      return false
    }
    
    return true
  }

  const procesarCompra = () => {
    if (carrito.length === 0) {
      return mostrarMensaje('El carrito está vacío', 'error')
    }
    
    if (!validarDatosEnvio()) return
    
    // Reducir stock
    setProductos(prev => prev.map(p => {
      const item = carrito.find(i => i.id === p.id)
      return item ? { ...p, stock: p.stock - item.cantidad } : p
    }))
    
    // Limpiar carrito y formularios
    setCarrito([])
    setCupon('')
    setDescuento(0)
    setDatosEnvio({ nombre: '', direccion: '', telefono: '', email: '' })
    
    mostrarMensaje('¡Compra procesada exitosamente! Gracias por tu pedido.', 'success', 5000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#8A2BE2',
        padding: '15px 30px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShoppingCart size={28} color="white" />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '800', 
              color: 'white',
              marginBottom: '2px'
            }}>
              Mi Tienda Online
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
              Los mejores productos al mejor precio
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '0.85rem', 
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '2px'
            }}>
              Bienvenido
            </div>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: '700', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <User size={16} />
              {usuario?.nombre || usuario?.correo || 'Usuario'}
            </div>
          </div>
          <button
            onClick={onCerrarSesion}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              fontFamily: 'Montserrat, sans-serif'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#c82333'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#dc3545'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Mensajes de notificación */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px'
      }}>
        {mensajes.map(m => (
          <div 
            key={m.id} 
            style={{
              padding: '14px 18px',
              borderRadius: '8px',
              fontWeight: '500',
              animation: 'slideDown 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              background: m.tipo === 'success' ? '#efe' : '#fee',
              color: m.tipo === 'success' ? '#3c3' : '#c33',
              border: `1px solid ${m.tipo === 'success' ? '#cfc' : '#fcc'}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>
                {m.tipo === 'success' ? '✓' : '⚠'}
              </span>
              <span>{m.texto}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '30px 20px' 
      }}>
        {/* Info del carrito */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px 30px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <ShoppingCart size={32} color="#8A2BE2" />
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '800', 
                color: '#333',
                marginBottom: '4px'
              }}>
                Carrito de Compras
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                {carrito.length === 0 
                  ? 'Tu carrito está vacío' 
                  : `${carrito.reduce((sum, item) => sum + item.cantidad, 0)} productos en el carrito`
                }
              </p>
            </div>
          </div>
          {carrito.length > 0 && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Total</div>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '800', 
                color: '#8A2BE2' 
              }}>
                ${calcularTotal().toLocaleString()}
              </div>
            </div>
          )}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 400px',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Productos y carrito */}
          <div>
            {/* Grid de productos */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#333',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Package size={24} color="#8A2BE2" />
                Productos Disponibles
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {productos.map(p => (
                  <ProductoCard 
                    key={p.id} 
                    producto={p} 
                    agregarAlCarrito={agregarAlCarrito} 
                  />
                ))}
              </div>
            </div>

            {/* Lista del carrito */}
            {carrito.length > 0 && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  color: '#333',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <ShoppingCart size={24} color="#8A2BE2" />
                  Contenido del Carrito ({carrito.length} productos)
                </h3>
                {carrito.map(item => (
                  <CarritoItem 
                    key={item.id} 
                    item={item} 
                    modificarCantidad={modificarCantidad} 
                    eliminarDelCarrito={eliminarDelCarrito} 
                  />
                ))}
              </div>
            )}

            {carrito.length === 0 && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '60px 30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <ShoppingCart size={80} color="#e0e0e0" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#666',
                  marginBottom: '10px'
                }}>
                  Tu carrito está vacío
                </h3>
                <p style={{ color: '#999' }}>
                  Agrega productos para comenzar tu compra
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Resumen y envío */}
          <div style={{ position: 'sticky', top: '20px' }}>
            <ResumenCarrito 
              subtotal={calcularSubtotal()} 
              descuento={calcularDescuento()} 
              total={calcularTotal()} 
              cupon={cupon} 
              setCupon={setCupon} 
              aplicarCupon={aplicarCupon} 
              porcentajeDescuento={descuento} 
            />
            <FormularioEnvio 
              datosEnvio={datosEnvio} 
              setDatosEnvio={setDatosEnvio} 
              procesarCompra={procesarCompra} 
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns: '1fr 400px'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}