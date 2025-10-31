import React from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'

export default function CarritoItem({ item, modificarCantidad, eliminarDelCarrito }) {
  return (
    <div className="bg-white rounded shadow p-3 flex items-center justify-between">
      <div>
        <div className="font-semibold">{item.nombre}</div>
        <div className="text-sm text-gray-500">{item.precio.toLocaleString()} c/u</div>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => modificarCantidad(item.id, item.cantidad - 1)} className="p-1 bg-gray-100 rounded"><Minus size={14} /></button>
        <button type="button" onClick={() => modificarCantidad(item.id, item.cantidad + 1)} className="p-1 bg-gray-100 rounded"><Plus size={14} /></button>
        <button type="button" onClick={() => eliminarDelCarrito(item.id)} className="text-red-500 ml-2"><Trash2 size={16} /></button>
      </div>
    </div>
  )
}