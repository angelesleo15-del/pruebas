import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export default function ProductoCard({ producto, agregarAlCarrito }) {
    const [cantidad, setCantidad] = useState(1)
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col">
            <div className="text-5xl text-center mb-2">{producto.imagen}</div>
            <h3 className="font-semibold">{producto.nombre}</h3>
            <p className="text-sm text-gray-500">{producto.categoria}</p>
            <div className="mt-2 flex items-center justify-between">
                <div className="text-indigo-600 font-bold">{producto.precio.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Stock: {producto.stock}</div>
            </div>
            <div className="mt-3 flex items-center gap-2">
                <button type="button" onClick={() => modificarCantidad(item.id, item.cantidad - 1)} className="p-1 bg-gray-100 rounded"><Minus size={14} /></button>
                <button type="button" onClick={() => modificarCantidad(item.id, item.cantidad + 1)} className="p-1 bg-gray-100 rounded"><Plus size={14} /></button>
                <button type="button" onClick={() => eliminarDelCarrito(item.id)} className="text-red-500 ml-2"><Trash2 size={16} /></button>
            </div>
        </div>
    )
}