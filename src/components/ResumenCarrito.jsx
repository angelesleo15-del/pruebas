import React from 'react'
import { Tag } from 'lucide-react'

export default function ResumenCarrito({ 
  subtotal, 
  descuento, 
  total, 
  cupon, 
  setCupon, 
  aplicarCupon, 
  porcentajeDescuento 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="font-bold text-xl mb-4 text-gray-800">Resumen del Pedido</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal.toLocaleString()}</span>
        </div>
        
        {porcentajeDescuento > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuento ({porcentajeDescuento}%)</span>
            <span className="font-semibold">-${descuento.toLocaleString()}</span>
          </div>
        )}
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span className="text-indigo-600">${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Tag size={16} />
          Código de cupón
        </label>
        <div className="flex gap-2">
          <input 
            value={cupon} 
            onChange={e => setCupon(e.target.value)} 
            placeholder="Ej: DESCUENTO10" 
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button 
            onClick={aplicarCupon} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            Aplicar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          💡 Usa DESCUENTO10 para compras superiores a $500,000
        </p>
      </div>
    </div>
  )
}