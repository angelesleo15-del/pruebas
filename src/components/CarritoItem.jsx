import React from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'

export default function CarritoItem({ item, modificarCantidad, eliminarDelCarrito }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <div className="font-semibold text-gray-800 text-lg">{item.nombre}</div>
        <div className="text-sm text-gray-500 mt-1">
          ${item.precio.toLocaleString()} c/u
        </div>
        <div className="text-sm font-semibold text-indigo-600 mt-1">
          Subtotal: ${(item.precio * item.cantidad).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg">
          <button 
            type="button" 
            onClick={() => modificarCantidad(item.id, item.cantidad - 1)} 
            className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
            title="Disminuir cantidad"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
            {item.cantidad}
          </span>
          <button 
            type="button" 
            onClick={() => modificarCantidad(item.id, item.cantidad + 1)} 
            className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
            title="Aumentar cantidad"
          >
            <Plus size={16} />
          </button>
        </div>

        <button 
          type="button" 
          onClick={() => eliminarDelCarrito(item.id)} 
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="Eliminar producto"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}