import React, { useState } from 'react'
import { Plus, Minus, ShoppingCart } from 'lucide-react'

export default function ProductoCard({ producto, agregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1)

  const incrementar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1)
    }
  }

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad)
    setCantidad(1)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="text-6xl text-center mb-3">{producto.imagen}</div>
      <h3 className="font-semibold text-lg text-gray-800">{producto.nombre}</h3>
      <p className="text-sm text-gray-500 mb-2">{producto.categoria}</p>
      
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="text-indigo-600 font-bold text-xl">
            ${producto.precio.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            Stock: {producto.stock}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg">
            <button 
              type="button" 
              onClick={decrementar}
              disabled={cantidad <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
              {cantidad}
            </span>
            <button 
              type="button" 
              onClick={incrementar}
              disabled={cantidad >= producto.stock}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
            >
              <Plus size={16} />
            </button>
          </div>

          <button 
            type="button" 
            onClick={handleAgregar}
            disabled={producto.stock === 0}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart size={18} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}