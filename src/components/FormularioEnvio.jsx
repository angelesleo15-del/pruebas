import React from 'react'
import { User, MapPin, Phone, Mail, CreditCard } from 'lucide-react'

export default function FormularioEnvio({ datosEnvio, setDatosEnvio, procesarCompra }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="font-bold text-xl mb-4 text-gray-800">Datos de Envío</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              placeholder="Juan Pérez" 
              value={datosEnvio.nombre} 
              onChange={e => setDatosEnvio(d => ({ ...d, nombre: e.target.value }))} 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              placeholder="Calle 123 #45-67" 
              value={datosEnvio.direccion} 
              onChange={e => setDatosEnvio(d => ({ ...d, direccion: e.target.value }))} 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              placeholder="+57 300 123 4567" 
              value={datosEnvio.telefono} 
              onChange={e => setDatosEnvio(d => ({ ...d, telefono: e.target.value }))} 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              placeholder="correo@ejemplo.com" 
              value={datosEnvio.email} 
              onChange={e => setDatosEnvio(d => ({ ...d, email: e.target.value }))} 
            />
          </div>
        </div>

        <button 
          type="button" 
          onClick={procesarCompra} 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
        >
          <CreditCard size={20} />
          Procesar Pago
        </button>
      </div>
    </div>
  )
}