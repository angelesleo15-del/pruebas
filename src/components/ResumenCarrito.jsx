import React from 'react'

export default function ResumenCarrito({ subtotal, descuento, total, cupon, setCupon, aplicarCupon, porcentajeDescuento }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold mb-2">Resumen</h3>
      <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toLocaleString()}</span></div>
      <div className="flex justify-between"><span>Descuento {porcentajeDescuento ? `(${porcentajeDescuento}%)` : ''}</span><span>-{descuento.toLocaleString()}</span></div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold"><span>Total</span><span>{total.toLocaleString()}</span></div>

      <div className="mt-3 flex gap-2">
        <input value={cupon} onChange={e => setCupon(e.target.value)} placeholder="Código cupón" className="flex-1 border rounded px-2 py-1" />
        <button onClick={aplicarCupon} className="bg-indigo-600 text-white px-3 rounded">Aplicar</button>
      </div>
    </div>
  )
}