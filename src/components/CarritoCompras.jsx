import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import ProductoCard from './ProductoCard'
import CarritoItem from './CarritoItem'
import ResumenCarrito from './ResumenCarrito'
import FormularioEnvio from './FormularioEnvio'

export default function CarritoCompras() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Laptop HP', precio: 2500000, stock: 10, imagen: '💻', categoria: 'Electrónica' },
    { id: 2, nombre: 'Mouse Logitech', precio: 80000, stock: 25, imagen: '🖱️', categoria: 'Accesorios' },
    { id: 3, nombre: 'Teclado Mecánico', precio: 350000, stock: 15, imagen: '⌨️', categoria: 'Accesorios' }
  ])

  const [carrito, setCarrito] = useState([])
  const [cupon, setCupon] = useState('')
  const [descuento, setDescuento] = useState(0)
  const [mensajes, setMensajes] = useState([])
  const [datosEnvio, setDatosEnvio] = useState({ nombre: '', direccion: '', telefono: '', email: '' })

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
    if (totalSolicitado > p.stock) return mostrarMensaje('No hay suficiente stock', 'error')
    if (existente) {
      setCarrito(c => c.map(i => i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i))
    } else {
      setCarrito(c => [...c, { id: p.id, nombre: p.nombre, precio: p.precio, cantidad }])
    }
    mostrarMensaje('Producto agregado', 'success')
  }

  const modificarCantidad = (id, nueva) => {
    if (nueva < 1) return eliminarDelCarrito(id)
    const p = productos.find(x => x.id === id)
    if (!p) return
    if (nueva > p.stock) return mostrarMensaje('No hay suficiente stock', 'error')
    setCarrito(c => c.map(i => i.id === id ? { ...i, cantidad: nueva } : i))
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(c => c.filter(i => i.id !== id))
    mostrarMensaje('Producto eliminado', 'success')
  }

  const calcularSubtotal = () => carrito.reduce((s, i) => s + i.precio * i.cantidad, 0)
  const calcularDescuento = () => Math.round((calcularSubtotal() * descuento) / 100)
  const calcularTotal = () => calcularSubtotal() - calcularDescuento()

  const aplicarCupon = () => {
    const code = cupon?.toUpperCase()
    if (code === 'DESCUENTO10' && calcularSubtotal() >= 500000) {
      setDescuento(10); mostrarMensaje('Cupón aplicado 10%', 'success'); return
    }
    mostrarMensaje('Cupón inválido o condiciones no cumplidas', 'error')
  }

  const validarDatosEnvio = () => {
    const { nombre, direccion, telefono, email } = datosEnvio
    if (!nombre || !direccion || !telefono || !email) {
      mostrarMensaje('Completa los datos de envío', 'error'); return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) { mostrarMensaje('Email inválido', 'error'); return false }
    return true
  }

  const procesarCompra = () => {
    if (carrito.length === 0) return mostrarMensaje('Carrito vacío', 'error')
    if (!validarDatosEnvio()) return
    // Reducir stock simulado
    setProductos(prev => prev.map(p => {
      const item = carrito.find(i => i.id === p.id)
      return item ? { ...p, stock: p.stock - item.cantidad } : p
    }))
    setCarrito([])
    setCupon(''); setDescuento(0)
    mostrarMensaje('Compra procesada correctamente', 'success', 4000)
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShoppingCart size={28} />
            <h1 className="text-2xl font-bold">Tienda</h1>
          </div>
        </header>

        {/* Mensajes */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {mensajes.map(m => (
            <div key={m.id} className={`px-4 py-2 rounded ${m.tipo === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {m.texto}
            </div>
          ))}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {productos.map(p => <ProductoCard key={p.id} producto={p} agregarAlCarrito={agregarAlCarrito} />)}
          </div>

          <aside className="space-y-4">
            <ResumenCarrito subtotal={calcularSubtotal()} descuento={calcularDescuento()} total={calcularTotal()} cupon={cupon} setCupon={setCupon} aplicarCupon={aplicarCupon} porcentajeDescuento={descuento} />
            <FormularioEnvio datosEnvio={datosEnvio} setDatosEnvio={setDatosEnvio} procesarCompra={procesarCompra} />
          </aside>
        </section>

        {/* Lista del carrito abajo */}
        {carrito.length > 0 && (
          <section className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold">Contenido del carrito</h2>
            {carrito.map(item => (
              <CarritoItem key={item.id} item={item} modificarCantidad={modificarCantidad} eliminarDelCarrito={eliminarDelCarrito} />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}