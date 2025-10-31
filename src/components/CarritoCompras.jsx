import React, { useState } from 'react'
import { ShoppingCart, Package } from 'lucide-react'
import ProductoCard from './ProductoCard'
import CarritoItem from './CarritoItem'
import ResumenCarrito from './ResumenCarrito'
import FormularioEnvio from './FormularioEnvio'

export default function CarritoCompras() {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <ShoppingCart className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Mi Tienda Online</h1>
                <p className="text-gray-600 text-sm">Los mejores productos al mejor precio</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Items en carrito</div>
              <div className="text-2xl font-bold text-indigo-600">
                {carrito.reduce((sum, item) => sum + item.cantidad, 0)}
              </div>
            </div>
          </div>
        </header>

        {/* Mensajes de notificación */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {mensajes.map(m => (
            <div 
              key={m.id} 
              className={`px-4 py-3 rounded-lg shadow-lg animate-slideIn ${
                m.tipo === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {m.tipo === 'success' ? '✓' : '⚠'}
                </span>
                <span className="font-medium">{m.texto}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package size={24} />
                Productos Disponibles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingCart size={24} />
                  Contenido del Carrito ({carrito.length} productos)
                </h2>
                <div className="space-y-3">
                  {carrito.map(item => (
                    <CarritoItem 
                      key={item.id} 
                      item={item} 
                      modificarCantidad={modificarCantidad} 
                      eliminarDelCarrito={eliminarDelCarrito} 
                    />
                  ))}
                </div>
              </div>
            )}

            {carrito.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500">
                  Agrega productos para comenzar tu compra
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Resumen y envío */}
          <aside className="space-y-6">
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
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}