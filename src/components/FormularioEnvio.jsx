import React from 'react'

export default function FormularioEnvio({ datosEnvio, setDatosEnvio, procesarCompra }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold mb-2">Datos de envío</h3>
      <input className="w-full mb-2 border rounded px-2 py-1" placeholder="Nombre" value={datosEnvio.nombre} onChange={e => setDatosEnvio(d => ({ ...d, nombre: e.target.value }))} />
      <input className="w-full mb-2 border rounded px-2 py-1" placeholder="Dirección" value={datosEnvio.direccion} onChange={e => setDatosEnvio(d => ({ ...d, direccion: e.target.value }))} />
      <input className="w-full mb-2 border rounded px-2 py-1" placeholder="Teléfono" value={datosEnvio.telefono} onChange={e => setDatosEnvio(d => ({ ...d, telefono: e.target.value }))} />
      <input className="w-full mb-4 border rounded px-2 py-1" placeholder="Email" value={datosEnvio.email} onChange={e => setDatosEnvio(d => ({ ...d, email: e.target.value }))} />
      <button type="button" onClick={procesarCompra} className="w-full bg-green-600 text-white py-2 rounded">Pagar</button>
    </div>
  )
}